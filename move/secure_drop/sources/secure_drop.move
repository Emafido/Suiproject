module secure_drop::secure_drop {
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::event;
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use std::vector;

    // --- Error Codes ---
    const EInvalidPin: u64 = 0;
    const ENotSender: u64 = 1;
    const ETooManyItems: u64 = 2; 

    // --- Objects ---
    struct Sword has key, store {
        id: UID,
        name: String,
        description: String
    }

    struct Drop has key, store {
        id: UID,
        balance: Balance<SUI>,
        items: vector<Sword>, 
        sender: address,
        recipient: address,
        pin_hash: vector<u8> 
    }

    // --- Events ---
    struct DropCreated has copy, drop {
        id: ID,
        sender: address,
        recipient: address,
        amount: u64,
        item_count: u64 
    }

    // --- 1. Create Drop ---
    public entry fun create_drop(
        payment: &mut Coin<SUI>,
        amount: u64,
        recipient: address,
        pin_bytes: vector<u8>,
        items: vector<Sword>, 
        ctx: &mut TxContext
    ) {
        assert!(vector::length(&items) <= 2, ETooManyItems);

        let payment_balance = coin::balance_mut(payment);
        let paid = balance::split(payment_balance, amount);
        let id = object::new(ctx);
        let drop_id = object::uid_to_inner(&id);
        let sender = tx_context::sender(ctx);
        let pin_hash = std::hash::sha3_256(pin_bytes);
        let item_count = vector::length(&items);

        let drop = Drop {
            id,
            balance: paid,
            items, 
            sender,
            recipient,
            pin_hash
        };

        event::emit(DropCreated {
            id: drop_id,
            sender,
            recipient,
            amount,
            item_count
        });

        transfer::share_object(drop);
    }

    // --- 2. Claim Drop ---
    public entry fun claim_drop(
        drop: &mut Drop, 
        pin_bytes: vector<u8>, 
        ctx: &mut TxContext
    ) {
        let input_hash = std::hash::sha3_256(pin_bytes);
        assert!(input_hash == drop.pin_hash, EInvalidPin);

        // 1. Take Money
        let amount = balance::value(&drop.balance);
        let cash = coin::take(&mut drop.balance, amount, ctx);
        transfer::public_transfer(cash, tx_context::sender(ctx));

        // 2. Take Items
        let item_count = vector::length(&drop.items);
        let i = 0;
        while (i < item_count) {
            let item = vector::pop_back(&mut drop.items);
            transfer::public_transfer(item, tx_context::sender(ctx));
            i = i + 1;
        };
    }

    // --- 3. Recall Drop (FIXED) ---
    public entry fun recall_drop(drop: Drop, ctx: &mut TxContext) {
        // Unpack the struct. "items" is mutable by default in this version.
        let Drop { id, balance, items, sender, recipient: _, pin_hash: _ } = drop;
        
        assert!(sender == tx_context::sender(ctx), ENotSender);

        // 1. Refund Money
        let cash = coin::from_balance(balance, ctx);
        transfer::public_transfer(cash, sender);

        // 2. Refund Items
        // We create a local variable to iterate over
        let mut_items = items; 
        
        while (!vector::is_empty(&mut_items)) {
            let item = vector::pop_back(&mut mut_items);
            transfer::public_transfer(item, sender);
        };
        vector::destroy_empty(mut_items);

        object::delete(id);
    }

    // --- 4. Mint Demo Sword ---
    public entry fun mint_sword(ctx: &mut TxContext) {
        let sword = Sword {
            id: object::new(ctx),
            name: string::utf8(b"SecureDrop Sword"),
            description: string::utf8(b"A legendary item.")
        };
        transfer::public_transfer(sword, tx_context::sender(ctx));
    }
}
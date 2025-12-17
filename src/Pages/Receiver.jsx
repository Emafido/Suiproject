const Receiver = () => {
  return (
    <div>
      <nav className="flex items-center px-4 py-3 w-full justify-between my-3 z-50 border-b ">
        <div className="flex gap-1">
          <img src="" alt="logo" />
          <p>SuiSecureDrop</p>
        </div>
        <ul className="gap-5 hidden sm:flex">
          <li>How it works</li>
          <li>Security</li>
          <li>Documentation</li>
        </ul>
        <button>Launch App</button>

        <i className="sm:hidden"></i>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
          <div>
            <p>Receiver Dashboard</p>
            <p>Secure transmission terminal active. Use your private key or pin to unlock incoming encrypted packages.</p>
          </div>
          <p>Pending Deliveries</p>
          <div>

          </div>
        </div>
        <div>
          <div>
            <p>Claim History</p>
            <p>View All</p>
          </div>
          <div>
            <div className="flex justify-between">
             <div>
               <i></i>
              <div>
                <p>Received 500 sui</p>
                <p>From 09w344...12x </p>
              </div>
             </div>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receiver

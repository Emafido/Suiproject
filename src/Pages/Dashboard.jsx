const Dashboard = () => {
  return (
    <div>
      <nav className="flex items-center px-4 py-6 border-gray-100 shadow-sm w-full justify-between z-50 border-b fixed bg-white">
        <div className="flex gap-1 items-center ">
          <i className="fa-solid fa-lock color"></i>
          <p>SuiSecureDrop</p>
        </div>

        <i className="sm:hidden"></i>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pt-25">
        <div>
          <div>
            <p className="mb-2 text-xl font-semibold">My Inventory</p>
            <div className="border rounded-2xl shadow-md p-5 bg-gray-700 border-gray-700 text-white">
              <p className="text-gray-300 ">Total Balance</p>
              <p className="text-2xl">
                145.20 <span>sui</span>
              </p>
              <p className="text-gray-400">Wallet:0x12...89ab</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-3">
              <p className="sm:text-xl font-semibold">My collectibles</p>
              <p className="sm:text-xl font-semibold">View All</p>
            </div>
            <div className="flex sm:flex-col gap-4 rounded-xl">
              <div className="flex border rounded-xl shadow-md border-gray-200 items-center justify-between py-4 px-10 gap-6">
                <div>
                  {/* <img src="" alt="" /> */}
                  <div>
                    <p className="font-semibold text-xl">Sui Sword #1</p>
                    <p className="text-gray-600">Legendary item</p>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-right text-gray-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="mb-2 sm:text-xl font-semibold">Outgoing Drops</p>
            <div className="mb-2 sm:text-xl font-semibold bg-green-300 px-4 py-1.5 rounded-2xl cursor-pointer hover:scale-110 transition-all delay-75">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex  border rounded-2xl shadow-md border-gray-200 flex-col px-4 py-6 ">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-lock"></i>
                    <div>
                      <p className="text-xl font-semibold">Drop #402</p>
                      <p className="text-gray-600">Created 2 mins ago</p>
                    </div>
                  </div>
                  <p>Locked</p>
                </div>
                <div className="flex justify-between">
                  <div className="border border-gray-100 bg-gray-100 p-3 rounded-2xl">
                    <p>Recipient</p>
                    <p>0xbi..34a</p>
                    <p>waiting for claim...</p>
                  </div>
                  <div className="border  border-gray-100 bg-gray-100 p-3 rounded-2xl">
                    <p>Contents</p>
                  </div>
                </div>
                <div className="flex justify-between border mt-4 py-4 px-2 rounded-xl red text-red-500">
                  <div className="flex gap-1 items-center">
                    <i className="fa-solid fa-circle-info"></i>
                    <p>Reversible until claimed</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-xmark"></i>
                    <p>Recall</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

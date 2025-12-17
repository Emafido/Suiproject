import '../App.css'
const Landing = () => {
  return (
    <div>
      <nav className='flex items-center px-4 py-6 w-full justify-between  z-50 border-b border-gray-100 shadow-sm fixed bg-white'>
        <div className='flex gap-1 items-center '>
          <i className="fa-solid fa-lock color"></i>
          <p>SuiSecureDrop</p>
        </div>
        <ul className='gap-5 hidden sm:flex'>
          <li>How it works</li>
          <li>Security</li>
          <li>Documentation</li> 
           </ul>       
        <button>Launch App</button>
       
        <i className='sm:hidden'></i>
      </nav>
      <section className='grid grid-cols-1 lg:grid-cols-2 text-center sm:text-left px-8 h-[95vh] pt-20 sm:pt-15 '>
        <div className="my-auto">
          <div className='border max-w-fit px-2 mx-auto sm:mx-0 py-0.5 rounded-2xl flex items-center gap-2 my-2'>
            <div className="w-2 h-2 color bgcolor rounded-full"></div>
            <p className='font-semibold'>Live on Sui Mainnet</p>
          </div>
          <div className='flex flex-col gap-1 mb-4'>
            <p className='text-3xl font-bold my-1'>SuiSecureDrop</p>
            <p className='text-xl text-gray-600 text-[1.1rem]'>The First Reversible, PIN-Protected Transfer Protocol on Sui.</p>
          </div>
          <div className='border-l-3 bcolor my-5 pl-1'>
            <p>Sent to wrong address? <span className='bgcolor'>Recall it.</span></p>
            <p>Scared of hackers? <span className='bgcolor'>PIN-protect it.</span></p>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row'>
            <div className='bgcolor py-2 px-2.5 rounded-2xl shadow-md '>
              <i></i>
              <p>Launch App</p>
            </div>
            <div className=' py-2 px-2.5 rounded-2xl shadow-md'>
              <i></i>
              <p>Read Documentation</p>
            </div>
          </div>
        </div>
        <div className="my-auto"></div>
      </section>
      <section className='bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 py-10 gap-10'>
        <div className='flex flex-col items-center'>
          <i className="fa-solid fa-link fa-2xl mb-4"></i>
          <p className='font-bold text-xl'>100% On-Chain</p>
          <p className='text-center text-gray-600'>Complete transparency. Every transaction is verifiable on the Sui explorer.</p>
        </div>
        <div className='flex flex-col items-center'>
          <i className="fa-solid fa-gavel fa-2xl mb-4"></i>
          <p className='font-bold text-xl'>Audited Contracts</p>
          <p className='text-center text-gray-600 '>Security first. Our Move contracts have undergone rigorous audits.</p>
        </div>
        <div className='flex flex-col items-center'>
          <i className="fa-solid fa-bolt-lightning fa-2xl mb-4"></i>
          <p className='font-bold text-xl'>Powered by Sui Move</p>
          <p className='text-center text-gray-600'>Built on the fastest, most secure object-centric blockchain infrastructure</p>
        </div>
      </section>
      <footer className='px-8 py-4'>
        <div className='flex justify-between flex-col sm:flex-row items-center gap-2'>
          <p className='whitespace-nowrap'>&copy; 2025 SuiSecureDrop. All rights reserved</p>
          <ul className='flex gap-4'>
            <li><a href="#"><i className="fa-lg fa-brands fa-x-twitter"></i></a></li>
            <li><a href="#"><i className="fa-lg fa-brands fa-instagram"></i></a></li>
            <li><a href="#"><i className="fa-lg fa-brands fa-linkedin"></i></a></li>
          </ul>
          <div className='flex flex-col sm:flex-row items-center gap-1 '>
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

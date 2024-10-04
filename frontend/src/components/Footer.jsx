// import React from 'react'
// import logo from '../assets/assets_frontend/logo.svg'

// export const Footer = () => {
//   return (
//     <div className='md:mx-10 m-3'>
//         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
//             {/* left section */}
//             <div className='mb-5 w-40'>
//                 <img className='mb-5 w-40' src={logo} alt=''/>
//                 <p className='w-full md:w-2/3 text-gray-600 leading-6'>
//                     This website was made by suhail just for te practice purpose this website was created

//                 </p>
//             </div>
//             {/* center section */}
//             <div>
//                 <p className='text-xl font-medium mb-5'>COMPANY</p>
//                 <ul className='flex flex-col gap-2 text-gray-600'>
//                      <li>Home</li>
//                     <li>About</li>
//                     <li>Contact</li>
//                     <li>Privacy Policy</li>
//                 </ul>
//             </div>
//             {/* right section */}
//             <div>
//                 <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//                 <ul className='flex flex-col gap-2 text-gray-600'>
//                     <li>+91 80722*****</li>
//                     <li>mhdsuhail@gmailcom</li>
//                 </ul>
//             </div>
//         </div>
//         {/* copy rights  */}
//         <div>
//             <hr />
//             <p className='py-5 text-sm text-center'>Copyright 2024@ myone - All Right Reserved.</p>
//         </div>
//     </div>
//   )
// }
import React from 'react'
import logo from '../assets/assets_frontend/logo.svg'

export const Footer = () => {
  return (
    <div className='md:mx-10 m-3'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* left section */}
        <div className='mb-5 sm:mb-0'>
          <img className='mb-5 w-40' src={logo} alt='Company Logo'/>
          <p className='text-gray-600 leading-6 max-w-xs'>
            This website was made by Suhail just for practice purposes. The website was created to learn and improve.
          </p>
        </div>
        
        {/* center section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        
        {/* right section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 80722*****</li> {/* Replace with a valid number */}
            <li>mhdsuhail@gmail.com</li> {/* Corrected email */}
          </ul>
        </div>
      </div>
      
      {/* copy rights */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ myone - All Rights Reserved.</p>
      </div>
    </div>
  )
}

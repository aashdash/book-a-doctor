// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContent'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// export const MyAppointments = () => {
//   const { backendUrl,token,getDoctorsData } = useContext(AppContext)

//   const[appointments,setAppointments] = useState([])
//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

//   const slotDateFormat = (slotDate) =>{
//     const dateArray = slotDate.split('_')
//     return dateArray[0]+ " " + months[Number(dateArray[1])]+ " " +dateArray[2]
//   }

//   const getUserAppointments = async () =>{
//     try{
//       const{data} = await axios.get(backendUrl+ '/api/user/appointments',{headers:{token}})
//       if(data.success){
//         setAppointments(data.appointments.reverse())
//         console.log(data.appointments)
//       }
//     }catch(error)
//   {
//     console.log(error);
//     toast.error(error.message)
//   }
// }

// const cancelAppointment = async (appointmentId) => {
//   try {
//     const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}});
//     if (data.success) {
//       toast.success(data.message);
//       getUserAppointments();
//       getDoctorsData()
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) { // Here, 'error' is now properly defined
//     console.error(error); // Print the entire error object for further investigation
//     toast.error(error.message); // Display the error message in a toast notification
//   }
// };

// // const appointmentRazorpay = async (appointmentId) =>{
// //   try{
// //     const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
// //     if (data.success){
// //       console.log(data.order)
// //     }
// //   }
// // }

// useEffect(()=>{
//   if(token){
//     getUserAppointments()
//   }
// },[token])

//   return (
//     <div className='m-8'>
//       <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
//       <div>
//         {appointments && appointments.slice(0, 3).map((item, index) => (
//           <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
//             <div>
//               <img className='w-32 bg-indigo-50' src={item.docData.image} alt={item.docData.name}  />
//             </div>
//             <div className='flex-1 text-sm text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'><strong>Doctor:</strong> {item.docData.name}</p>
//               <p><strong>Specialty:</strong> {item.docData.speciality}</p>
//               <p className='text-zinc-700 font-medium mt-1'><strong>Address:</strong></p>
//               <p className='text-xs'>{item.docData.address.line1}</p>
//               <p className='text-xs'>{item.docData.address.line2}</p>
//               <p className='text-xs mt-1'><strong className='text-sm text-neutral-700 font-medium'>Date & Time:</strong> {item.slotDate} | {item.slotTime}</p>
//             </div>
//             <div className='flex flex-col gap-2 justify-end'>
//               <button  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
//               <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContent";
import axios from "axios";
import { toast } from "react-toastify";

export const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false); // State to manage payment popup visibility
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Function to handle payment click and show the popup
  const handlePaymentClick = () => {
    setShowPaymentSuccess(true);

    // Automatically hide the popup after 3 seconds
    setTimeout(() => {
      setShowPaymentSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="m-8">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments &&
          appointments.slice(0, 3).map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  <strong>Doctor:</strong> {item.docData.name}
                </p>
                <p>
                  <strong>Specialty:</strong> {item.docData.speciality}
                </p>
                <p className="text-zinc-700 font-medium mt-1">
                  <strong>Address:</strong>
                </p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <strong className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </strong>{" "}
                  {item.slotDate} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <button
                  onClick={handlePaymentClick}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Payment Success Popup */}
      {showPaymentSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md text-center">
            <h2 className="text-lg font-bold text-green-600">
              Payment Successful
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContent';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctor from '../components/RelatedDoctor';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]); // Clear previous slots
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today); // Create a new Date object for each iteration
      currentDate.setDate(today.getDate() + i); // Increment day by i days

      // Set end time of each day to 9 PM
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        // If it's today, adjust time based on the current hour and minute
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10)); // Start from the next hour or 10 AM
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future days, start at 10 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add the slots for the current day
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const handleSlotSelection = (index, time) => {
    setSlotIndex(index); // Update selected slot index
    setSlotTime(time);   // Update selected time
  };

  return (
    docInfo && (
      <div>
        {/* ---- Doctor Details ---- */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='' />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-1 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}
              <img className='w-5' src={assets.verified_icon} alt='' />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            {/* doctor about */}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt='' /></p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* ------- BOOKING SLOTS ------- */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex justify-center gap-3 items-center w-full overflow-x-scroll mt-4'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                  onClick={() => handleSlotSelection(index, item[0]?.time)} // Handle slot selection
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Display Selected Time */}
        <div className='flex justify-center items-center gap-3 w-full mt-4'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* Centering the "Book an Appointment" Button */}
        <div className='flex justify-center'>
          <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>
            Book an appointment
          </button>
        </div>
      
        {/* listing related doctors */}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality}></RelatedDoctor>
      </div>
    )
  );
};

export default Appointment;
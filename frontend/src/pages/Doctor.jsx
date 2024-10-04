import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContent'
import { useNavigate } from 'react-router-dom'


export const Doctor = () => {
    const navigate = useNavigate()
    
    const { speciality } = useParams()
    console.log(speciality)
    const { doctors } = useContext(AppContext)
    const [filterDoc,setFilterDoc] = useState([])
    const [showFilter,setShowFilter] = useState()

    const applyFilter = () => {
        if(speciality){
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        }else{
            setFilterDoc(doctors)
        }
    }

    useEffect(()=>{
        applyFilter()
    },[doctors,speciality])
    
  return (
    <div className='m-3'>
        <p className='text-gray-600'>Browse through the doctors speciality</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
            <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
            <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

                <p onClick={()=> speciality === 'Generalphysician'?navigate('/doctors') : navigate('/doctors/Generalphysician')} className='w-[94vw] sm:w-auto m-3 pl-3 py-1.5 pr-16 border  border-gray-300 rounded transition-all cursor-pointer ${speciality ==="Generalphysician" ? "bg-indigo-100 text-black : ""}'>General physician</p>
                <p onClick={()=> speciality === 'Gynecologist'?navigate('/doctors') : navigate('/doctors/Gynecologist')} className='w-[94vw] sm:w-auto m-3 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality ==="Gynecologist" ? "bg-indigo-100 text-black : ""}'>Gynecologist</p>
                <p onClick={()=> speciality === 'Dermatologist'?navigate('/doctors') : navigate('/doctors/Dermatologist')} className='w-[94vw] sm:w-auto m-3 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality ==="Dermatologist" ? "bg-indigo-100 text-black : ""}'>Dermatologist</p>
                <p onClick={()=> speciality === 'Pediatrician'?navigate('/doctors') : navigate('/doctors/Pediatrician')} className='w-[94vw] sm:w-auto m-3 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality ==="pediatrician" ? "bg-indigo-100 text-black : ""}'>Pediatrician</p>
                <p onClick={()=> speciality === 'Neurologist'?navigate('/doctors') : navigate('/doctors/Neurologist')} className='w-[94vw] sm:w-auto m-3 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality ==="neurologist" ? "bg-indigo-100 text-black : ""}'>Neurologist</p>
                <p onClick={()=> speciality === 'Gastroentrerologist'?navigate('/doctors') : navigate('/doctors/Gastroentrerologist')} className='w-[94vw] sm:w-auto m-3 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality ==="Gastroentrerologist" ? "bg-indigo-100 text-black : ""}'>Gastroentrerologist</p>
            </div>
            <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                {
                    filterDoc.map((item, index) => (
                    <div 
                        onClick={() => navigate(`/appointment/${item._id}`)} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                        key={index}
                    >
                        <img className='bg-blue-50' src={item.image} alt={item.name}/>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                )) 
                }
            </div>
        </div>
    </div>
  )
}

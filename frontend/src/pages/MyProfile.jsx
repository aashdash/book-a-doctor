// import React, { useState } from 'react'
// import { assets } from '../assets/assets_frontend/assets'

// export const MyProfile = () => {
//     const [userData,setUserData] = useState({
//         name:"Nasiyanur Natha",
//         image:assets.profile_pic,
//         email:'snailshit@gmail.com',
//         phone:'8072294374',
//         address:{
//             line1:"39b,Natesan Nagar",
//             line2:"iyyapandhangal,chennai"
//         },
//         gender:'male',
//         dob:'2004-12-05'
//     })
//     const [isEdit,setIsEdit] = useState(false)
//   return (
//     <div className='max-w-lg flex flex-col gap-2 text-sm mr-3'>
//         <img className='w-36 rounded' src={userData.image} alt=""></img>
//         {
//             isEdit
//             ?<input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}) )}/>
//             :<p className='font-medium text-3xl text-neutral-800 mt-4 '>{userData.name}</p>
//         }
//         <hr className='text-neutral-500 underline mt-3'/>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'> 
//             <p className='text-neutral-500 underline mt-3 text-neutral-700 '>Contact Information</p>
//             <div>
//                 <p>Email id:</p>
//                 <p>{userData.email}</p>
//                 <p>phone:</p>
//                 {
//             isEdit
//             ?<input type='text' value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}) )}/>
//             :<p>{userData.phone}</p>
//         }
//         <p>Address:</p>
//         {
//             isEdit
//             ?<p>
//                 <input onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}) )} value={userData.address.line1} type="text"></input>
//                 <br/>
//                 <input onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}) )} value={userData.address.line2} type='text'/>
//             </p>
//             :<p>
//                 {userData.address.line1}
//                 <br/>
//                 {userData.address.line2}

//             </p>
//         }
//             </div>
//         </div>
//         <div>
//           <p>BASIC INFORMATION</p>  
//           <div>
//             <p>Gender:</p>
//             {
//             isEdit
//             ? <select onChange={(e) => setUserData(prev => ({...prev,gender: e.target.value}))} value={userData.gender}>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//             </select>
//             :<p>{userData.gender}</p>
//         }
//             <p>Birthday:</p>
//             {
//                 isEdit? <input type="date" onChange={(e) => setUserData(prev => ({...prev,dob: e.target.value}))} value={userData.dob}/>
//                 :<p>{userData.dob}</p>
//             }
//           </div>
//         </div>
//         <div>
//             {
//                 isEdit
//                 ?<button onClick={()=>setIsEdit(false)}>Save information</button>
//                 :<button onClick={()=>setIsEdit(true)}>Edit</button>
//             }
//         </div>
//     </div>
//   )
// }
import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

export const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "Nasiyanur Natha",
        image: assets.profile_pic,
        email: 'snailshit@gmail.com',
        phone: '8072294374',
        address: {
            line1: "39b, Natesan Nagar",
            line2: "Iyyapandhangal, Chennai"
        },
        gender: 'male',
        dob: '2004-12-05'
    })

    const [isEdit, setIsEdit] = useState(true)

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-xl w-full p-8 border rounded-lg shadow-lg text-neutral-800">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <img className="w-36 h-36 rounded-full" src={userData.image} alt="Profile" />
                </div>

                {/* User Name */}
                <div className="text-center mb-6">
                    {
                        isEdit
                        ? <input 
                            className='bg-gray-50 text-3xl font-medium w-full text-center' 
                            type='text' 
                            value={userData.name} 
                            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                        : <p className='font-medium text-3xl'>{userData.name}</p>
                    }
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                    <h2 className="font-semibold mb-2">Contact Information</h2>
                    <div className="space-y-2 text-neutral-600">
                        <p>Email id: {userData.email}</p>
                        <p>Phone: 
                            {
                                isEdit
                                ? <input 
                                    type='text' 
                                    className="bg-gray-50 w-full p-1 border rounded mt-1"
                                    value={userData.phone} 
                                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                : <span> {userData.phone}</span>
                            }
                        </p>
                        <p>Address: 
                            {
                                isEdit
                                ? <div>
                                    <input 
                                        onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={userData.address.line1} 
                                        type="text" 
                                        className="bg-gray-50 w-full p-1 border rounded mt-1" />
                                    <input 
                                        onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={userData.address.line2} 
                                        type='text' 
                                        className="bg-gray-50 w-full p-1 border rounded mt-1" />
                                  </div>
                                : <span> {userData.address.line1}, {userData.address.line2}</span>
                            }
                        </p>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="mb-8">
                    <h2 className="font-semibold mb-2">Basic Information</h2>
                    <div className="space-y-2 text-neutral-600">
                        <p>Gender: 
                            {
                                isEdit
                                ? <select 
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                    value={userData.gender} 
                                    className="bg-gray-50 w-full p-1 border rounded mt-1">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <span> {userData.gender}</span>
                            }
                        </p>
                        <p>Birthday: 
                            {
                                isEdit
                                ? <input 
                                    type="date" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                    value={userData.dob} 
                                    className="bg-gray-50 w-full p-1 border rounded mt-1" />
                                : <span> {userData.dob}</span>
                            }
                        </p>
                    </div>
                </div>

                {/* Edit/Save Button */}
                <div className="flex justify-center gap-4">
                    {
                        isEdit
                        ? <button 
                            className='border border-primary text-primary py-2 px-6 rounded hover:bg-primary hover:text-white transition' 
                            onClick={() => setIsEdit(false)}>
                            Save Information
                          </button>
                        : <button 
                            className='border border-primary text-primary py-2 px-6 rounded hover:bg-primary hover:text-white transition' 
                            onClick={() => setIsEdit(true)}>
                            Edit
                          </button>
                    }
                </div>
            </div>
        </div>
    )
}

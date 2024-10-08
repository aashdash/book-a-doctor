import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContent'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(true)
    const [image, setImage] = useState(false)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/updated-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData && (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-xl w-full p-8 border rounded-lg shadow-lg text-neutral-800">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    {
                        isEdit
                            ? <label htmlFor='image'>
                                <div className='inline-block relative cursor-pointer'>
                                    <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                    <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
                            </label>
                            : <img className="w-36 h-36 rounded-full" src={userData.image} alt="Profile" />
                    }
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
                        <div> {/* Correcting the block-level element nesting */}
                            Address:
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
                        </div>
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
                                onClick={updateUserProfileData}>
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

export default MyProfile

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        return navigate('/');
    };

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>
    );

    const { id, email, username } = user;

    return (
        <>
            <div className=" bg-green-200 flex flex-col items-center p-6 space-y-6">
                {/* Welcome Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                    <h3 className="text-2xl font-semibold mb-3">Welcome</h3>
                    <p className="text-lg text-blue-500">{username}</p>
                </div>

                {/* User ID Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                    <h3 className="text-2xl font-semibold mb-3">Your userId in MongoDB is</h3>
                    <p className="text-lg text-gray-700">{id}</p>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                    <h3 className="text-2xl font-semibold mb-3">Your email is</h3>
                    <p className="text-lg text-gray-700">{email}</p>
                </div>
                <button 
                    onClick={(e) => handleClick(e)} 
                    className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-red-700 transition duration-300"
                >
                    Log Out
                </button>
            </div>

    
        </>
    );
};

export default HomePage;

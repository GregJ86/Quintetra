import React from 'react';

const Landingpage = () => {
    return (
        <div className="bg-green-200 text-white p-5 h-screen flex justify-center items-center">
            {/* Custom Card Container */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 h-96 flex flex-col items-center">
                <h1 id="title">Quintétre</h1>
                <h1 id="subtitle">-a gold crafting card game-</h1>
                
                {/* Sign Up Link */}
                <div className="mb-4 w-full">
                    <a href="/signup" className="flex justify-center items-center px-4 py-2 text-white bg-green-500 hover:bg-green-700 text-xl rounded-md transition duration-200 no-underline">Sign Up</a>
                </div>
                
                {/* Login Link */}
                <div className="mb-4 w-full">
                    <a href="/login" className="flex justify-center items-center px-4 py-2 text-white bg-green-500 hover:bg-green-700 text-xl rounded-md transition duration-200 no-underline">Login</a>
                </div>
                
                {/* Continue as Guest Link */}
                <div className="w-full">
                    <a href="/privateUserProfile" className="flex justify-center items-center px-4 py-2 text-white bg-green-500 hover:bg-green-700 text-xl rounded-md transition duration-200 no-underline">Continue as Guest</a>
                </div>
            </div>
        </div>
    );
};

export default Landingpage;

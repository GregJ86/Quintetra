import React from 'react';

const Landingpage = () => {
    return (
        <div className="bg-green-200 text-white p-5 h-screen flex justify-center items-center">
            {/* Custom Card Container */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 h-96 flex flex-col items-center">
                <div className="text-4xl font-bold mb-5 text-blue-500">Quintetra</div>
                <div className="text-2xl mb-10 text-gray-700">Play cards for gold!</div>
                
                {/* Sign Up Link */}
                <div className="mb-4 w-full">
                    <a href="/signup" className="flex justify-center items-center text-3xl text-blue-500 hover:text-blue-700">Sign Up</a>
                </div>
                
                {/* Login Link */}
                <div className="mb-4 w-full">
                    <a href="/login" className="flex justify-center items-center text-3xl text-blue-500 hover:text-blue-700">Login</a>
                </div>
                
                {/* Quick Play Link */}
                <div className="w-full">
                    <a href="/gamePage" className="flex justify-center items-center text-3xl text-blue-500 hover:text-blue-700">Quick Play</a>
                </div>
            </div>
        </div>
    );
};

export default Landingpage;

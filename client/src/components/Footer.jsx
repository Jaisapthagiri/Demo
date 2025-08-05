import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-b from-[#1B004D] mt-75 to-[#2E0A6F] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed w-100">
                    Connecting passionate learners with meaningful opportunities. Start your journey. Build your future.
                </p>
            </div>
            
            <div className="border-t border-[#3B1A7A]">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <h2 className='text-white text-2xl'>Intern Career</h2> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
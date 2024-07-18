import React from 'react';

const Navbar: React.FC = () => {
    return (
        <>
            <div className='bg-white p-4 shadow-lg'>
                <div className='container mx-auto flex items-center justify-between'>
                    <div className='text-black font-bold text-xl'>
                        <a href='#'>Logo</a>
                    </div>
                    <div className='hidden md:flex space-x-4'>
                        <a href='#' className='text-blue hover:text-white'>
                            Home
                        </a>
                        <a href='#' className='text-blue hover:text-white'>
                            About
                        </a>
                        <a href='#' className='text-blue hover:text-white'>
                            Contact
                        </a>
                        <a href='#' className='text-blue hover:text-white'>
                            Help
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

import React from 'react';
import coconatLogo from '../../assets/coconutLogo.png';

const TopSection: React.FC = () => {
    return (
        <>
            <div className='mt-20 mr-32 ml-32 flex'>
                <div className='max-w-3xl'>
                    <h1 className='text-6xl font-bold mb-4 leading-normal font-sans'>
                        Pineapple and Coconut <br />
                        Inspection
                    </h1>
                    <div>
                        <p className='text-xl leading-normal'>
                            We provide the best quality inspection services for
                            your pineapples and coconuts. Our team of experts
                            will ensure that your products are of the highest
                            quality.
                        </p>
                    </div>
                </div>
                <div className='w-[450px] ml-[50px]'>
                    <div className='relative w-full pt-[121.29%] '>
                        <img
                            className='absolute inset-0 w-full h-full object-cover'
                            src={coconatLogo}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopSection;

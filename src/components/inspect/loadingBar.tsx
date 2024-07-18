import React from 'react';

type LoadingBarProps = {
    progress: number;
};

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
    return (
        <div className='w-full bg-gray-200 rounded-full h-4'>
            <div
                className='bg-blue-500 h-4 rounded-full transition-width duration-300 ease-in-out'
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default LoadingBar;

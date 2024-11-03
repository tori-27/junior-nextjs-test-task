// components/ProgressLoader.js
import React, { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const ProgressBarLoader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return oldProgress + 10;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ProgressBar completed={progress} bgColor="#ff69b4" height="25px" width="90%" />
            <p className="text-pink-500 mt-4 text-xl">{progress}%</p>
            <p className="text-gray-600 mt-2 text-sm">Caching data... Please wait.</p>
        </div>
    );
};

export default ProgressBarLoader;

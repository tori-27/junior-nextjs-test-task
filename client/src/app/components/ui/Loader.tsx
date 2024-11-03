import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <BounceLoader color="#ff69b4" size={60}/>
        </div>


    );
};

export default Loader;

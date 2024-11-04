import React from 'react';
import GoBackButton from './GoBackButton';

type NoDataProps = {
    country: string;
};

const NoData: React.FC<NoDataProps> = ({ country }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-sm">
                <h1 className="text-4xl font-bold text-gray-800">OOPS!</h1>
                <p className="text-lg text-gray-600 mt-2">
                    No data available for {country}.
                </p>
                <div className="mt-6">
                    <GoBackButton />
                </div>
            </div>
        </div>
    );
};

export default NoData;

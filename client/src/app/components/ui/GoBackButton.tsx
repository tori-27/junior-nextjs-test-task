import React from 'react';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-green-600 transition-colors"
        >
            Go Back
        </button>
    );
};

export default GoBackButton;

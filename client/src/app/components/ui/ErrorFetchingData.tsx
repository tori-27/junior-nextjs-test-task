import React from 'react';

type ErrorMessageProps = {
    message: string;
    onRetry?: () => void;
};

const ErrorFetchingData: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="mb-4">{message}</p>
        </div>
    );
};

export default ErrorFetchingData;

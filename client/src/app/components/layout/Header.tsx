import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-pink-500 py-6 px-12 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
                <img
                    src="/icons/lightbulb.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
                <span className="text-white text-lg font-semibold">Electricity Prices</span>
            </div>
        </header>
    );
};

export default Header;

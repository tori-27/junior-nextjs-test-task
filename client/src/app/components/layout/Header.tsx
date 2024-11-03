import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className="bg-pink-500 py-6 px-12 flex justify-between items-center shadow-md">

            <div className="flex items-center space-x-2">
                <Image
                    src="/icons/lightbulb.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
                <span className="text-white text-lg font-semibold">Electricity Prices</span>
            </div>

            <div className="flex space-x-4">
                <Image
                    src="/icons/uk.svg"
                    alt="English"
                    width={24}
                    height={24}
                    className="rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
                <Image
                    src="/icons/sk.svg"
                    alt="Slovak"
                    width={24}
                    height={24}
                    className="rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
            </div>
        </header>
    );
};

export default Header;

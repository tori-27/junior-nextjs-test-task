import React from 'react';
import Image from 'next/image';

type ActivityWidgetProps = {
    name: string;
    icon: string;
    cost: string;
};

const ActivityWidget: React.FC<ActivityWidgetProps> = ({ name, icon, cost }) => {
    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <Image src={`/icons/${icon}.svg`} alt={name} className="h-8 w-8 mb-2" width={32} height={32} />
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-xl font-bold">{cost} €</p>
        </div>
    );
};

export default ActivityWidget;

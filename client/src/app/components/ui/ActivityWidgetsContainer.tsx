
import React from 'react';
import  calculateElectricityCost  from '../../services/calculateElectricityCost';
import ActivityWidget from './ActivityWidget';

type ActivityWidgetsContainerProps = {
    pricePerMWh: number;
};

const ActivityWidgetsContainer: React.FC<ActivityWidgetsContainerProps> = ({ pricePerMWh }) => {
    const activityCosts = calculateElectricityCost(pricePerMWh);

    return (
        <div className="w-full bg-pink-100 py-8">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activityCosts.map((activity, index) => (
                    <ActivityWidget
                        key={index}
                        name={activity.name}
                        icon={activity.icon}
                        cost={activity.cost}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActivityWidgetsContainer;

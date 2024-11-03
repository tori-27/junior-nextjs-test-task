export type ActivityCost = {
    name: string;
    icon: string;
    cost: string;
};

const calculateElectricityCost = (pricePerMWh: number): ActivityCost[] => {
    const pricePerKWh = pricePerMWh / 1000;

    const activityCosts: ActivityCost[] = [
        {
            name: 'Refrigerator',
            icon: 'fridge',
            cost: (0.1 * pricePerKWh).toFixed(2)
        },
        {
            name: 'Charge a mobile',
            icon: 'mobile',
            cost: (0.005 * pricePerKWh).toFixed(2)
        },
        {
            name: 'Take a shower',
            icon: 'shower',
            cost: (0.5 * pricePerKWh).toFixed(2)
        },
        {
            name: 'Washing machine',
            icon: 'washing-machine',
            cost: (0.7 * pricePerKWh).toFixed(2)
        },
        {
            name: 'Boil 1 liter of water',
            icon: 'water',
            cost: (0.1 * pricePerKWh).toFixed(2)
        },
        {
            name: 'Charge electric car',
            icon: 'car',
            cost: (50 * pricePerKWh).toFixed(2)
        }
    ];

    return activityCosts;
};

export default calculateElectricityCost;

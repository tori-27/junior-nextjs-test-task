// services/calculateElectricityCost.ts

export type ActivityCost = {
    name: string;
    icon: string; // URL або ім'я іконки
    cost: string; // Використовуємо тип string, оскільки toFixed повертає рядок
};

const calculateElectricityCost = (pricePerMWh: number): ActivityCost[] => {
    // Переводимо ціну в EUR за кВт·год (1 МВт·год = 1000 кВт·год)
    const pricePerKWh = pricePerMWh / 1000;

    const activityCosts: ActivityCost[] = [
        {
            name: 'Refrigerator',
            icon: 'fridge', // Назва іконки або шлях до неї
            cost: (0.1 * pricePerKWh).toFixed(2) // Припустимо, що холодильник використовує 0.1 кВт·год на годину
        },
        {
            name: 'Charge a mobile',
            icon: 'mobile',
            cost: (0.005 * pricePerKWh).toFixed(2) // Припустимо, що зарядка мобільного телефону використовує 0.005 кВт·год
        },
        {
            name: 'Take a shower',
            icon: 'shower',
            cost: (0.5 * pricePerKWh).toFixed(2) // Припустимо, що душ використовує 0.5 кВт·год
        },
        {
            name: 'Washing machine',
            icon: 'washing-machine',
            cost: (0.7 * pricePerKWh).toFixed(2) // Припустимо, що пральна машина використовує 0.7 кВт·год
        },
        {
            name: 'Boil 1 liter of water',
            icon: 'water',
            cost: (0.1 * pricePerKWh).toFixed(2) // Припустимо, що кип'ятіння 1 літра води використовує 0.1 кВт·год
        },
        {
            name: 'Charge electric car',
            icon: 'car',
            cost: (50 * pricePerKWh).toFixed(2) // Припустимо, що зарядка електромобіля використовує 50 кВт·год
        }
    ];

    return activityCosts;
};

export default calculateElectricityCost;

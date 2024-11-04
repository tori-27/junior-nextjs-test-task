import React from 'react';

type ChartToggleButtonProps = {
    isLineChart: boolean;
    onToggle: () => void;
};

const ChartToggleButton: React.FC<ChartToggleButtonProps> = ({ isLineChart, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600"
        >
            Switch to {isLineChart ? 'Bar' : 'Line'} Chart
        </button>
    );
};

export default ChartToggleButton;

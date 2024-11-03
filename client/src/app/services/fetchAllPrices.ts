const fetchAllPrices = async () => {
    const response = await fetch('/api/all-prices');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

export default fetchAllPrices;



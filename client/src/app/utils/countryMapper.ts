const countryToBiddingZone: { [key: string]: string } = {
    austria: 'AT',
    belgium: 'BE',
    switzerland: 'CH',
    "czech republic": 'CZ',
    germany: 'DE-LU',
    france: 'FR',
    hungary: 'HU',
    italy: 'IT-North',
    netherlands: 'NL',
    norway: 'NO2',
    poland: 'PL',
    sweden: 'SE4',
    slovenia: 'SI',
    denmark: 'DK1',
    "denmark 1": 'DK1',
    "denmark 2": 'DK2'
};

const biddingZoneToCountry: { [key: string]: string } = Object.fromEntries(
    Object.entries(countryToBiddingZone).map(([country, bzn]) => [bzn, country])
);
export function getBiddingZone(countryName: string): string | null {
    return countryToBiddingZone[countryName.toLowerCase()] || null;
}

export function getCountryFromBiddingZone(biddingZone: string): string | null {
    return biddingZoneToCountry[biddingZone] || null;
}

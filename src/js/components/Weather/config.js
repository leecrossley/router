export const mapQuestURI = (city) =>
    `https://www.mapquestapi.com/geocoding/v1/address?key=NcKGBOcknHaJK2JgGzBsCLsIFYdgRctf&inFormat=kvp&outFormat=json&location=${city},United+Kingdom&thumbMaps=false`
export const darkSkyURI = (lat, lng) =>
    `https://api.darksky.net/forecast/cc22deea061a9aa4e85b9d7317697ae3/${lat},${lng}?units=si&exclude=flags,minutely`;

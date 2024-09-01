export const decodeCoordinate = (encodedStr: string): Array<[number, number]> => {
    const reverseMap: { [key: string]: string } = {
        'a': '0', 'b': '1', 'c': '2', 'd': '3', 'e': '4',
        'f': '5', 'g': '6', 'h': '7', 'i': '8', 'j': '9',
        'k': '.', 'l': ','
    };

    // Function to decode a single encoded part
    const decodeSingle = (encodedPart: string): string => {
        let decodedStr = '';
        for (let char of encodedPart) {
            decodedStr += reverseMap[char] || char; // Decode or keep the character as is
        }
        return decodedStr;
    };

    // Split the encoded string by "-" to get each encoded coordinate pair
    const decodedCoordinates = encodedStr.split('-').map(encoded => {
        // Replace "l" back to "," and decode the individual parts
        const [lat, lng] = encoded.split('l').map(decodeSingle);
        return [parseFloat(lat), parseFloat(lng)] as [number, number];
    });

    return decodedCoordinates;
    }
    


export const encodeCoordinate = (coordinates: Array<string> ) => {
    const map: { [key: string]: string } = {
        '0': 'a', '1': 'b', '2': 'c', '3': 'd', '4': 'e',
        '5': 'f', '6': 'g', '7': 'h', '8': 'i', '9': 'j',
        '.': 'k', ',': 'l'
    };

    // Function to encode a single coordinate
    const encodeSingle = (coordinate: string): string => {
        let encodedStr = '';
        for (let char of coordinate) {
            encodedStr += map[char] || char; // Encode or keep the character as is
        }
        return encodedStr;
    };

    // Encode each coordinate pair
    const encodedCoordinates = coordinates.map(coordinate => {
        return coordinate.trim().split(',').map(part => encodeSingle(part)).join('l');
    });

    // Join the encoded coordinate pairs with a "-" separator
    return encodedCoordinates.join('-');
    }
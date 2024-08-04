
// Convert time in seconds to a formatted string in hrs and mins and seconds strings
const getFormattedEstimatedTime = (time: number) => {
    if (time < 60) {
        return `${time.toFixed()} sec`;
    }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    if (hours === 0) {
        return `${minutes} min`;
    }
    
    return `${hours} hrs ${minutes} mins`;
};
// Convert distance in meters to a formatted string in km alone or m
const getFormattedDistance = (distance: number) => {
    if (distance >= 1000) {
        return `${(distance / 1000).toFixed(1)} km`;
    }
    return `${distance.toFixed()} m`;
}


export { getFormattedEstimatedTime, getFormattedDistance }
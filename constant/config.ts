
type APP_CONFIG_TYPE = {
    projectStatus: string;
    percentage: number;
    CUSTOM_ATTRIBUTION:string;
    MAP_CONFIG: {
        MAP_CENTER: number[],
        MAP_STYLE: string
    }
}

const APP_CONFIG: APP_CONFIG_TYPE = {
    projectStatus: "In Progress",
    percentage: 20.5,

    CUSTOM_ATTRIBUTION: "Development by YouthMappers Dev. led by Victor Ademoyero",
    MAP_CONFIG: {
        MAP_CENTER: [5.210266, 7.250771],
        MAP_STYLE: "mapbox://styles/mapbox/streets-v12"
    }
}


export default APP_CONFIG
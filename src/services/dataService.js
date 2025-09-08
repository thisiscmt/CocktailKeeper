import Axios from 'axios';

export const backupCocktailData = (authHeader, cocktailData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    };

    const data = {
        data: cocktailData,
        timestamp: new Date().getTime()
    };

    return Axios.post(`${import.meta.env.VITE_API_URL}/cocktail/backup`, data, config);
};

export const restoreCocktailData = async (authHeader) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    };

    const cocktailData = await Axios.get(`${import.meta.env.VITE_API_URL}/cocktail/backup?provider=server`, config);
    return cocktailData.data;
};

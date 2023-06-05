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

    return Axios.post(process.env.REACT_APP_API_URL + '/cocktail/backup', data, config);
};

export const restoreCocktailData = async (authHeader) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    };

    const cocktailData = await Axios.get(process.env.REACT_APP_API_URL + '/cocktail/backup?backupType=server', config);
    return cocktailData.data;
};

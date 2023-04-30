import {Axios} from 'axios';

import RecipeService from './recipeService';

export const backupToServer = (authHeader) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    };

    const data = {
        data: RecipeService.getRecipeData(),
        timestamp: new Date().getTime()
    }

    return Axios.put(process.env.REACT_APP_API_URL + '/bookmark/backup', data, config)
};

export const restoreFromServer = () => {

};

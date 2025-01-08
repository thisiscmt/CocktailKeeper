import * as Constants from '../constants/constants';

export const getPreferences = () => {
    const preferencesJSON = localStorage.getItem(Constants.STORAGE_PREFERENCES);
    let preferences = {};

    if (preferencesJSON) {
        preferences = JSON.parse(preferencesJSON);
    } else {
        preferences.defaultUnit = '0';
    }

    return preferences;
}

export const getErrorMessage = (error) => {
    let msg = '';

    if (error) {
        if (error.response && typeof error.response.data && typeof error.response.data === 'string') {
            msg = error.response.data;
        } else if (error.response && error.response.statusText) {
            msg = error.response.statusText;
        } else {
            if (error.message) {
                msg = error.message;
            }
            else if (typeof error === 'string') {
                msg = error;
            }
            else {
                msg = 'An unexpected error occurred';
            }
        }
    }

    return msg;
};

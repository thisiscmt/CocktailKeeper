import React, {useContext, useEffect, useState} from 'react';
import { Box, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as SharedService from '../../services/sharedService';
import {Context} from '../../stores/mainStore';
import {AlertSeverity} from '../../enums/AlertSeverity';
import {STORAGE_PREFERENCES} from '../../constants/constants';

const useStyles = makeStyles({
    mainContainer: {
        textAlign: 'center'
    },

    section : {
        marginBottom: '16px',
        marginTop: '16px'
    },

    defaultUnitLabel: {
        display: 'inline-flex',
        fontWeight: 500,
        marginRight: '15px'
    },

    defaultUnitSelector: {
        color: 'black',
        fontSize: '14px',
        width: '100px'
    }
});

const Preferences = (props) => {
    const classes = useStyles(props);
    const [ defaultUnit, setDefaultUnit ] = useState(SharedService.getPreferences().defaultUnit);
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        document.title = 'Preferences - Cocktail Keeper';
    });

    const handleDefaultUnitChange = (event) => {
        if (event.target.value !== defaultUnit) {
            setDefaultUnit(event.target.value);

            const preferences = {
                defaultUnit: event.target.value
            };

            localStorage.setItem(STORAGE_PREFERENCES, JSON.stringify(preferences));
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'Preferences saved', severity: AlertSeverity.Success} });
        }
    };

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.section}>
                <label className={classes.defaultUnitLabel}>Default unit:</label>

                <Select
                    value={defaultUnit}
                    onChange={handleDefaultUnitChange}
                    className={classes.defaultUnitSelector}
                    data-testid='SettingsDefaultUnit'
                >
                    <MenuItem value='0'>Select unit</MenuItem>
                    <MenuItem value='oz'>oz</MenuItem>
                    <MenuItem value='ml'>ml</MenuItem>
                    <MenuItem value='dash'>dash</MenuItem>
                    <MenuItem value='tsp'>tsp</MenuItem>
                    <MenuItem value='tbsp'>tbsp</MenuItem>
                </Select>
            </Box>

        </Box>
    );
}

export default Preferences;

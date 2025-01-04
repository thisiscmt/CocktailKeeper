import React, {useContext, useEffect, useState} from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Context} from '../../stores/mainStore';
import { AlertSeverity } from '../../enums/AlertSeverity';
import { Colors } from '../../services/themeService';
import * as Constants from '../../constants/constants';
import * as SharedService from '../../services/sharedService';

const useStyles = makeStyles()(() => ({
    mainContainer: {
        backgroundColor: Colors.backgroundGray,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingBottom: '16px',
        paddingTop: '16px',
        textAlign: 'center'
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
}));

const Preferences = (props) => {
    const { classes, cx } = useStyles(props);
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

            localStorage.setItem(Constants.STORAGE_PREFERENCES, JSON.stringify(preferences));
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'Preferences saved', severity: AlertSeverity.Success} });
        }
    };

    return (
        <Box className={cx(classes.mainContainer)}>
            <Box>
                <label className={cx(classes.defaultUnitLabel)}>Default unit:</label>

                <Select
                    value={defaultUnit}
                    onChange={handleDefaultUnitChange}
                    className={classes.defaultUnitSelector}
                    data-testid='SettingsDefaultUnit'
                    size='small'
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

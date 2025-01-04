import React, { useContext, useEffect, useState } from 'react';
import { FormControl, FormControlLabel, TextField, Button, Box, Radio, RadioGroup, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { Context } from '../../stores/mainStore';
import { AlertSeverity } from '../../enums/AlertSeverity';
import { Colors } from '../../services/themeService';
import * as Constants from '../../constants/constants';
import * as DataService from '../../services/dataService';
import * as RecipeService from '../../services/recipeService';
import * as SharedService from '../../services/sharedService';

const useStyles = makeStyles()((theme) => ({
    mainContainer: {
        backgroundColor: Colors.backgroundGray,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingBottom: '16px',
        paddingTop: '16px'
    },

    section: {
        marginTop: '16px'
    },

    recipeCountSection: {
        fontSize: '12px',
        marginTop: '16px'
    },

    recipeCount: {
        '& span': {
            marginLeft: '8px'
        }
    },

    lastChangedSection: {
        fontSize: '12px',
        marginBottom: '6px',
        marginTop: '4px',

        '& p': {
            display: 'inline-block',

            [theme.breakpoints.down(450)]: {
                display: 'block'
            }
        }
    },

    lastChanged: {
        '& span': {
            marginLeft: '8px'
        },

        [theme.breakpoints.down(450)]: {
            marginLeft: 0,
            marginTop: '4px'
        }
    },

    radioButtonSection: {
        marginTop: '10px'
    },

    textFieldLabelRoot: {
        marginRight: '16px'
    },

    textFieldLabel: {
        fontSize: '14px',
        fontWeight: 500,
        marginRight: '12px',
        minWidth: '90px',
        textAlign: 'right'
    },

    providerLabel: {
        marginRight: '16px'
    },

    providerOptions: {
        paddingBottom: '2px',
        paddingTop: '2px'
    }
}));

const Config = (props) => {
    const { classes, cx } = useStyles(props);
    const [ , dispatch ] = useContext(Context);
    const [ userName, setUserName ] = useState(localStorage.getItem(Constants.STORAGE_USER_NAME) ? localStorage.getItem(Constants.STORAGE_USER_NAME) : '');
    const [ password, setPassword ] = useState(localStorage.getItem(Constants.STORAGE_PASSWORD) ? '********' : '');
    const [ passwordChanged, setPasswordChanged ] = useState(false);
    const [ provider, setProvider ] = useState('Server');
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        document.title = 'Config - Cocktail Keeper';
    });

    const handleChangeUserName = (event) => {
        setUserName(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setPasswordChanged(true);
    }

    const handleBackupCocktailData = async () => {
        if (userName && password) {
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: ''} });
            const passwordToUse = passwordChanged ? password : localStorage.getItem(Constants.STORAGE_PASSWORD);
            const authHeader = 'Basic ' + window.btoa(userName + ':' + passwordToUse);

            try {
                setLoading(true);
                await DataService.backupCocktailData(authHeader, RecipeService.getRecipeData());
                localStorage.setItem(Constants.STORAGE_USER_NAME, userName);

                if (passwordChanged) {
                    localStorage.setItem(Constants.STORAGE_PASSWORD, password);
                }

                dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'Cocktail data backed up successfully', severity: AlertSeverity.Success} });
            } catch (error) {
                dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: SharedService.getErrorMessage(error), severity: AlertSeverity.Error} });
            } finally {
                setLoading(false);
            }
        }
        else {
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'You must provide a user name and password', severity: AlertSeverity.Warning} });
        }
    };

    const handleRestoreCocktailData = async () => {
        if (userName && password) {
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: ''} });
            const passwordToUse = passwordChanged ? password : localStorage.getItem(Constants.STORAGE_PASSWORD);
            const authHeader = 'Basic ' + window.btoa(userName + ':' + passwordToUse);

            try {
                setLoading(true);

                const recipeData = await DataService.restoreCocktailData(authHeader);
                localStorage.setItem(Constants.STORAGE_USER_NAME, userName);

                if (passwordChanged) {
                    localStorage.setItem(Constants.STORAGE_PASSWORD, password);
                }

                RecipeService.setRecipeData(recipeData);
                dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'Cocktail data restored successfully', severity: AlertSeverity.Success} });
            } catch (error) {
                if (error.response.status === 403) {
                    dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'Please verify the current login', severity: AlertSeverity.Info} });
                } else {
                    dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: SharedService.getErrorMessage(error), severity: AlertSeverity.Error} });
                }
            } finally {
                setLoading(false);
            }
        }
        else {
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'You must provide a user name and password', severity: AlertSeverity.Warning} });
        }
    };

    const recipeCount = RecipeService.getRecipeCount();
    const lastChangeTimestamp = RecipeService.getFormattedLastChangedTimestamp();

    return (
        <Box className={`loadable-container ${cx(classes.mainContainer)}`}>
            <LoadingOverlay open={loading} />

            <Box>
                <FormControl>
                    <FormControlLabel
                        classes={{ root: cx(classes.textFieldLabelRoot), label: cx(classes.textFieldLabel) }}
                        labelPlacement='start'
                        label='User name:'
                        control={
                            <TextField
                                id='UserName'
                                type='email'
                                autoComplete='email username'
                                margin='none'
                                variant='outlined'
                                name='userName'
                                value={userName}
                                size='small'
                                fullWidth={true}
                                autoCorrect='off'
                                inputProps={{ maxLength: 50 }}
                                onChange={handleChangeUserName}
                            />
                        }
                    />
                </FormControl>
            </Box>

            <Box className={cx(classes.section)}>
                <FormControl>
                    <FormControlLabel
                        classes={{ root: cx(classes.textFieldLabelRoot), label: cx(classes.textFieldLabel) }}
                        labelPlacement='start'
                        label='Password:'
                        control={
                            <TextField
                                id='UserName'
                                type='password'
                                autoComplete='current-password'
                                margin='none'
                                variant='outlined'
                                name='password'
                                value={password}
                                size='small'
                                fullWidth={true}
                                autoCorrect='off'
                                inputProps={{ maxLength: 50 }}
                                onChange={handleChangePassword}
                            />
                        }
                    />
                </FormControl>
            </Box>

            <Box className={cx(classes.recipeCountSection)}>
                <Typography variant='body2' className={cx(classes.recipeCount)}>Recipes:<span>{recipeCount}</span></Typography>
            </Box>

            {
                lastChangeTimestamp &&
                <Box className={cx(classes.lastChangedSection)}>
                    <Typography variant='body2'>Data last changed:</Typography>
                    <Typography variant='body2' className={cx(classes.lastChanged)}><span>{lastChangeTimestamp}</span></Typography>
                </Box>
            }

            <Box className={cx(classes.radioButtonSection)}>
                <FormControl>
                    <FormControlLabel
                        classes={{ root: cx(classes.textFieldLabelRoot), label: `${cx(classes.textFieldLabel)} ${cx(classes.providerLabel)}` }}
                        labelPlacement='start'
                        label='Provider:'
                        control={
                            <RadioGroup row={true} name='Provider' value={provider} onChange={event => setProvider(event.target.value)}>
                                <FormControlLabel
                                    value='Server'
                                    label='Server'
                                    control={<Radio color='primary' className={cx(classes.providerOptions)} />}
                                />
                            </RadioGroup>
                        }
                    />
                </FormControl>
            </Box>

            <Box className={cx(classes.section)}>
                <Button variant='contained' color='primary' size='small' onClick={handleBackupCocktailData}>
                    Backup
                </Button>
            </Box>

            <Box className={cx(classes.section)}>
                <Button variant='contained' color='primary' size='small' onClick={handleRestoreCocktailData}>
                    Restore
                </Button>
            </Box>
        </Box>
    );
}

export default Config;

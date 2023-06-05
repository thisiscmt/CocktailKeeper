import React, { useContext, useEffect, useState } from 'react';
import { FormControl, FormControlLabel, TextField, Button, Box, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { Context } from '../../stores/mainStore';
import {AlertSeverity} from '../../enums/AlertSeverity';
import * as DataService from '../../services/dataService';
import * as RecipeService from '../../services/recipeService';
import * as SharedService from '../../services/sharedService';
import {STORAGE_PASSWORD, STORAGE_USER_NAME} from '../../constants/constants';

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '16px',
        paddingTop: '16px'
    },

    section: {
        marginTop: '16px'
    },

    buttonSection: {
        marginTop: '8px'
    },

    sectionText : {
        marginTop: 0,
        marginBottom: '10px'
    },

    textFieldLabelRoot: {
        marginRight: '16px'
    },

    textFieldLabel: {
        fontSize: '14px',
        marginRight: '8px',
        minWidth: '90px',
        textAlign: 'left'
    },

    dataSourceLabel: {
        marginRight: '16px'
    },

    dataSourceOptions: {
        paddingBottom: '2px',
        paddingTop: '2px'
    },

    actionButton: {
        backgroundColor: '#396B9E'
    }
});

const Config = (props) => {
    const classes = useStyles(props);
    const [ , dispatch ] = useContext(Context);
    const [ userName, setUserName ] = useState(localStorage.getItem(STORAGE_USER_NAME) ? localStorage.getItem(STORAGE_USER_NAME) : '');
    const [ password, setPassword ] = useState(localStorage.getItem(STORAGE_PASSWORD) ? '********' : '');
    const [ passwordChanged, setPasswordChanged ] = useState(false);
    const [ dataSource, setDataSource ] = useState('Server');
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
            const passwordToUse = passwordChanged ? password : localStorage.getItem(STORAGE_PASSWORD);
            const authHeader = 'Basic ' + window.btoa(userName + ':' + passwordToUse);

            try {
                setLoading(true);
                await DataService.backupCocktailData(authHeader, RecipeService.getRecipeData());
                localStorage.setItem(STORAGE_USER_NAME, userName);

                if (passwordChanged) {
                    localStorage.setItem(STORAGE_PASSWORD, password);
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
            const passwordToUse = passwordChanged ? password : localStorage.getItem(STORAGE_PASSWORD);
            const authHeader = 'Basic ' + window.btoa(userName + ':' + passwordToUse);

            try {
                setLoading(true);

                const recipeData = await DataService.restoreCocktailData(authHeader);
                localStorage.setItem(STORAGE_USER_NAME, userName);

                if (passwordChanged) {
                    localStorage.setItem(STORAGE_PASSWORD, password);
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

    return (
        <Box className={`loadable-container ${classes.mainContainer}`}>
            <LoadingOverlay open={loading} />

            <Box>
                <FormControl>
                    <FormControlLabel
                        classes={{ root: classes.textFieldLabelRoot, label: classes.textFieldLabel }}
                        labelPlacement='start'
                        label='User name *'
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

            <Box className={classes.section}>
                <FormControl>
                    <FormControlLabel
                        classes={{ root: classes.textFieldLabelRoot, label: classes.textFieldLabel }}
                        labelPlacement='start'
                        label='Password *'
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

            <Box className={classes.section}>
                <Box className={classes.sectionText}>Back up cocktail data</Box>
            </Box>

            <Box>
                <FormControl>
                    <FormControlLabel
                        classes={{ root: classes.textFieldLabelRoot, label: `${classes.textFieldLabel} ${classes.dataSourceLabel}` }}
                        labelPlacement='start'
                        label='Data source'
                        control={
                            <RadioGroup row={true} name="DataSource" value={dataSource} onChange={event => setDataSource(event.target.value)}>
                                <FormControlLabel
                                    value="Server"
                                    label="Server"
                                    control={<Radio color='primary' className={classes.dataSourceOptions} />}
                                />
                            </RadioGroup>
                        }
                    />
                </FormControl>
            </Box>

            <Box className={classes.buttonSection}>
                <Button variant='outlined' color='default' size='small' onClick={handleBackupCocktailData}>
                    Backup
                </Button>
            </Box>

            <Box className={classes.section}>
                <Box>Restore cocktail data</Box>
            </Box>

            <Box className={classes.buttonSection}>
                <Button variant='outlined' color='default' size='small' onClick={handleRestoreCocktailData}>
                    Restore
                </Button>
            </Box>
        </Box>
    );
}

export default Config;

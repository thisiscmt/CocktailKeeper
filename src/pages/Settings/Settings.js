import React, {useRef, useState} from 'react';
import {Box, Button, Container, MenuItem, Select} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RecipeService from '../../services/recipeService';
import SharedService from '../../services/sharedService';

const useStyles = makeStyles({
    root: {
        paddingTop: '5px',
        paddingBottom: '5px',
    },

    section : {
        marginBottom: '18px'
    },

    sectionText : {
        marginTop: 0,
        marginBottom: '14px'
    },

    action: {
        marginTop: '16px'
    },

    defaultUnitLabel: {
        display: 'inline-flex',
        marginRight: '15px'
    },

    defaultUnitSelector: {
        color: 'black',
        fontSize: '14px',
        width: '100px'
    },

    restoreContainer: {
        marginBottom: '10px'
    },

    fileUploadLabel: {
        cursor: 'pointer',
        display: 'inline-block',
        marginBottom: '5px'
    },

    fileUploadInput: {
        display: 'none'
    },

    selectedFile: {
        fontSize: '14px',
        fontStyle: 'italic',
        marginBottom: '10px'
    },

    messageContainer: {
        color: '#DC143C',
        fontSize: '14px',
        marginBottom: '8px',
        marginTop: '8px'
    }
});

const SettingsPage = (props) => {
    const classes = useStyles(props);
    const theme = SharedService.buildThemeConfig();
    const fileInput = useRef();
    let reader;

    const [ defaultUnit, setDefaultUnit ] = useState(SharedService.getSettings().defaultUnit);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ message, setMessage ] = useState('');

    const handleDefaultUnitChange = (event) => {
        if (event.target.value !== defaultUnit) {
            setDefaultUnit(event.target.value);

            const settings = {
                defaultUnit: event.target.value
            };

            localStorage.setItem('ck.settings', JSON.stringify(settings));
            setMessage('Settings saved')
        }
    };

    const handleSelectFile = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleBackup = () => {
        const recipeData = RecipeService.getRecipeData();

        if (recipeData) {
            const recipeJSON = JSON.parse(recipeData);
            recipeJSON.savedOn = new Date().getTime();



        }
    };

    const handleRestore = () => {



        RecipeService.setRecipeData(reader.result);
        setSelectedFile(null);
        setMessage('Data restored successfully');
    };

    return (
        <Box className={classes.root}>
            <Container maxWidth='sm'>
                <section>
                    {
                        message &&
                        <div className={classes.messageContainer}>
                            {message}
                        </div>
                    }
                </section>

                <section className={classes.section}>
                    <label className={classes.defaultUnitLabel}>Default unit:</label>

                    <Select
                        value={defaultUnit}
                        onChange={handleDefaultUnitChange}
                        className={classes.defaultUnitSelector}
                        data-testid='SettingsDefaultUnit'
                    >
                        <MenuItem value={'0'}>Select unit</MenuItem>
                        <MenuItem value={'oz'}>oz</MenuItem>
                        <MenuItem value={'ml'}>ml</MenuItem>
                        <MenuItem value={'dash'}>dash</MenuItem>
                        <MenuItem value={'tsp'}>tsp</MenuItem>
                        <MenuItem value={'tbsp'}>tbsp</MenuItem>
                    </Select>
                </section>

                <section className={classes.section}>
                    <div className={classes.sectionText}>Back up recipe data</div>

                    <Button variant='outlined' color='default' size='small' onClick={handleBackup}>
                        Backup
                    </Button>
                </section>

                <section>
                    <div className={classes.sectionText}>Restore recipe data</div>

                    <div className={classes.restoreContainer}>
                        <label htmlFor="FileUpload" className={classes.fileUploadLabel} style={{color: theme.palette.primary.main}}>Browse
                            <input
                                type="file"
                                id="FileUpload"
                                name="file"
                                className={classes.fileUploadInput}
                                ref={fileInput}
                                onChange={handleSelectFile}
                                accept='.json'
                            />
                        </label>

                        {
                            selectedFile &&
                            <div className={classes.selectedFile}>{ selectedFile.name }</div>
                        }

                        <div>
                            <Button
                                variant='outlined'
                                color='default'
                                size='small'
                                disabled={!selectedFile}
                                onClick={handleRestore}
                            >
                                Restore
                            </Button>
                        </div>
                    </div>
                </section>
            </Container>
        </Box>
    );
}

export default SettingsPage;

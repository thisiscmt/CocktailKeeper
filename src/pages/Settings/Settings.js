import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';

const styles = makeStyles({
    root: {
        paddingTop: '5px',
        paddingBottom: '5px'
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

    userMessage: {
        fontSize: '14px',
        marginBottom: '10px'
    }
});

const SettingsPage = (props) => {
    const classes = styles(props);
    const theme = SharedService.buildThemeConfig();
    const fileInput = React.createRef();
    let reader;

    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ success, setSuccess ] = useState(false);

    const handleDownload = (fileName, data) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
    }

    const handleSelectFile = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleReaderLoadEnd = () => {
        if (reader.result) {
            RecipeService.setRecipeData(reader.result);
            setSelectedFile(null);
            setSuccess(true);
        }
    };

    const handleBackup = () => {
        const recipeData = RecipeService.getRecipeData();

        if (recipeData) {
            const recipeJSON = JSON.parse(recipeData);
            recipeJSON.savedOn = new Date().getTime();

            handleDownload('Cocktail Keeper recipes.json', JSON.stringify(recipeJSON));
        }
    };

    const handleRestore = () => {
        reader = new FileReader();
        reader.onloadend = handleReaderLoadEnd;
        reader.readAsText(selectedFile);
    };

    return (
        <div className={classes.root}>
            <Container maxWidth='sm'>
                <p>Back up all recipe data</p>

                <Button variant='outlined' color='default' size='small' onClick={handleBackup}>
                    Backup
                </Button>

                <p>Restore recipe data</p>

                <div className={classes.restoreContainer}>
                    <label htmlFor="FileUpload" className={classes.fileUploadLabel} style={{color: theme.palette.primary.main}}>Browse
                        <input
                            type="file"
                            id="FileUpload"
                            name="file"
                            className={classes.fileUploadInput}
                            ref={fileInput}
                            onChange={handleSelectFile}
                            accept='.json'/>
                    </label>

                    {
                        selectedFile &&
                        <div className={classes.selectedFile}>{ selectedFile.name }</div>
                    }

                    {
                        success &&
                        <div className={classes.userMessage}>Data restored successfully</div>
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
            </Container>
        </div>
    );
}

export default SettingsPage;

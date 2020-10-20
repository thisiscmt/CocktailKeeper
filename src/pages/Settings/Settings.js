import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';

const styles = createStyles({
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

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
        this.theme = SharedService.buildThemeConfig();

        this.state = {
            selectedFile: null,
            success: false
        };
    }

    handleDownload = (fileName, data) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
    }

    handleSelectFile = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    };

    handleReaderLoadEnd = () => {
        if (this.reader.result) {
            RecipeService.setRecipeData(this.reader.result);
            this.setState({ selectedFile: null, success: true });
        }
    };

    handleBackup = () => {
        const recipeData = RecipeService.getRecipeData();

        if (recipeData) {
            const recipeJSON = JSON.parse(recipeData);
            recipeJSON.savedOn = new Date().getTime();

            this.handleDownload('Cocktail Keeper recipes.json', JSON.stringify(recipeJSON));
        }
    };

    handleRestore = () => {
        this.reader = new FileReader();
        this.reader.onloadend = this.handleReaderLoadEnd;
        this.reader.readAsText(this.state.selectedFile);
    };

    render() {
        const { classes } = this.props;
        const { selectedFile, success } = this.state;

        return (
            <div className={classes.root}>
                <Container maxWidth='sm'>
                    <p>Back up all recipe data</p>

                    <Button variant='outlined' color='default' size='small' onClick={this.handleBackup}>
                        Backup
                    </Button>

                    <p>Restore recipe data</p>

                    <div className={classes.restoreContainer}>
                        <label htmlFor="FileUpload" className={classes.fileUploadLabel} style={{color: this.theme.palette.primary.main}}>Browse
                            <input
                                type="file"
                                id="FileUpload"
                                name="file"
                                className={classes.fileUploadInput}
                                ref={this.fileInput}
                                onChange={this.handleSelectFile}
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
                                onClick={this.handleRestore}
                            >
                                Restore
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);

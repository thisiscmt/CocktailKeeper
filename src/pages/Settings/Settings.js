import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';

const styles = createStyles({
    root: {
        paddingTop: '5px'
    },

    customFileUpload: {
        cursor: 'pointer',
        display: 'inline-block'
//        fontWeight: 600,
//        marginLeft: '5px',
//        verticalAlign: 'top'
    }
});

class Settings extends React.Component {
    download = (fileName, text) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
    }

    handleDownload = () => {
        const recipeData = RecipeService.getRecipeData();

        if (recipeData) {
            this.download('Cocktail Keeper recipes.json', recipeData);
        }
    };

    handleSelectFile = () => {

    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth='sm'>
                    <Button variant='outlined' color='default' size='small' onClick={this.handleDownload}>
                        Download
                    </Button>

                    <label htmlFor='FileUpload' className={classes.customFileUpload}>Browse
                        <input type='file'
                               id='FileUpload'
                               name='file'
                               onChange={this.handleSelectFile}
                               accept=".json"/>
                    </label>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);

import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';

const styles = createStyles({
    root: {
        paddingTop: '5px',
        paddingBottom: '5px'
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

    handleBackup = () => {
        const recipeData = RecipeService.getRecipeData();

        if (recipeData) {
            const recipeJSON = JSON.parse(recipeData);
            recipeJSON.savedOn = new Date().getTime();

            this.download('Cocktail Keeper recipes.json', recipeJSON);
        }
    };

    handleRestore = () => {
        // TODO
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth='sm'>
                    <p>Back up all recipe data</p>

                    <Button variant='outlined' color='default' size='small' onClick={this.handleBackup}>
                        Backup
                    </Button>

                    <p>Restore recipe data</p>

                    <p>
                        <Button variant='outlined' color='default' size='small' onClick={this.handleRestore}>
                            Restore
                        </Button>
                    </p>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);

import React from 'react';
import Button from "@material-ui/core/Button";
import {createStyles, withStyles} from "@material-ui/styles";

const styles = createStyles({
    editButton: {
        textAlign: 'right'
    }
});

class ViewRecipe extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.editButton}>
                    <Button variant='outlined' color='primary' size='medium'>
                        Edit
                    </Button>
                </div>

                This is for viewing recipes
            </div>
        )}
}

export default withStyles(styles)(ViewRecipe);

import React from 'react';
import Button from "@material-ui/core/Button";
import {createStyles, withStyles} from "@material-ui/styles";

const styles = createStyles({
    controls: {
        marginTop: '10px',
        marginBottom: '10px'
    }
});

class EditRecipe extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                This is for editing recipes

                <div className={classes.controls}>
                    <Button variant='outlined' color='primary' size='medium'>
                        Save
                    </Button>
                </div>
            </div>
        )}
}

export default withStyles(styles)(EditRecipe);

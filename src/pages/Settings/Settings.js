import React from 'react';
import {createStyles, withStyles} from "@material-ui/styles";

const styles = createStyles({
    controls: {
        marginTop: '10px',
        marginBottom: '10px'
    }
});

class Settings extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>This is for settings</div>
        )}
}

export default withStyles(styles)(Settings);

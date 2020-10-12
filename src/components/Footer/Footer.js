import React from 'react';
import { Link } from 'react-router-dom';
import {createStyles, withStyles} from '@material-ui/core/styles';

const styles = createStyles({
    footer: {
        alignItems: 'center',
        backgroundColor: 'darkcyan',
        display: 'flex',
        height: '40px',
        justifyContent: 'center'
    }
});

class Footer extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.footer}>
                <Link to={'/settings'} className={'nav-link'}>
                    <span className={'fancy-nav'}>Settings</span>
                </Link>
            </footer>
        )}
}

export default withStyles(styles)(Footer);

import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        alignItems: 'center',
        backgroundColor: 'darkcyan',
        display: 'flex',
        height: '40px',
        gap: '20px',
        justifyContent: 'center'
    }
});

const Footer = (props) => {
    const classes = useStyles(props);

    return (
        <footer className={classes.footer}>
            <Link to='/config' className='nav-link'>
                <span className='fancy-nav'>Config</span>
            </Link>

            <Link to='/preferences' className='nav-link'>
                <span className='fancy-nav'>Preferences</span>
            </Link>
        </footer>
    )
}

export default Footer;

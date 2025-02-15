import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
    footer: {
        alignItems: 'center',
        backgroundColor: 'darkcyan',
        display: 'flex',
        gap: '20px',
        paddingBottom: '10px',
        paddingTop: '10px',
        justifyContent: 'center'
    }
}));

const Footer = (props) => {
    const { classes, cx } = useStyles(props);

    return (
        <footer className={cx(classes.footer)}>
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

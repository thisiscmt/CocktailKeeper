import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    footer: {
        alignItems: 'center',
        backgroundColor: 'darkcyan',
        display: 'flex',
        height: '40px',
        justifyContent: 'center'
    }
});

const Footer = (props) => {
    const classes = styles(props);


    return (
        <footer className={classes.footer}>
            <Link to={'/settings'} className={'nav-link'}>
                <span className={'fancy-nav'}>Settings</span>
            </Link>
        </footer>
    )
}

export default Footer;

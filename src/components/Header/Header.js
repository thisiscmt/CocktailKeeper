import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert, Fade } from '@mui/material';
import { AddBoxOutlined } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';

import { Context } from '../../stores/mainStore';

const useStyles = makeStyles()(() => ({
    header: {
        alignItems: 'center',
        backgroundColor: 'darkcyan',
        display: 'flex',
        paddingBottom: '12px',
        paddingTop: '12px',
        justifyContent: 'space-between'
    },

    headerTitle: {
        fontSize: '24px',
        marginLeft: '10px'
    },

    headerControls: {
        height: '35px',
        marginRight: '10px'
    }
}));

const Header = (props) => {
    const { classes, cx } = useStyles(props);
    const [state, dispatch] = useContext(Context);
    const location = useLocation();

    // We clear any previous banner message upon each route change
    useEffect(() => {
        dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: ''} })
    }, [location, dispatch]);

    return (
        <>
            <header className={cx(classes.header)}>
                <div className={cx(classes.headerTitle)}>
                    <Link to='/' className='nav-link'>
                        <span className='fancy-nav'>Cocktail Keeper</span>
                    </Link>
                </div>

                <div className={classes.headerControls}>
                    <Link to='/recipe' className='nav-link' title='Add a new recipe'>
                        <AddBoxOutlined fontSize='large' />
                    </Link>
                </div>
            </header>

            {
                state.bannerMessage &&
                <>
                    <Fade in={!!state.bannerMessage} timeout={600}>
                        <Alert severity={state.bannerSeverity}>{state.bannerMessage}</Alert>
                    </Fade>
                </>
            }
        </>
    )
}

export default Header;

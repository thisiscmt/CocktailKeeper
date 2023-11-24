import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AddBoxOutlined } from '@mui/icons-material';

import { Context } from '../../stores/mainStore';
import {Alert, Fade} from '@mui/material';

const useStyles = makeStyles()(() => ({
    header: {
        alignItems: 'center',
        backgroundColor: 'darkcyan',
        display: 'flex',
        height: '60px',
        justifyContent: 'space-between'
    },

    headerTitle: {
        fontSize: '24px',
        marginLeft: '10px',
        textAlign: 'left'
    },

    headerControls: {
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
                    <div>
                        <Link to='/recipe' className='nav-link' title='Add a new recipe'>
                            <AddBoxOutlined fontSize='large' />
                        </Link>
                    </div>
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

import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Fade } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import { Context } from '../../stores/mainStore';

const useStyles = makeStyles({
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
});

const Header = (props) => {
    const classes = useStyles(props);
    const [state, dispatch] = useContext(Context);
    const location = useLocation();

    // We update various pieces of the UI and clear any previous banner message upon each route change
    useEffect(() => {
        dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: ''} })
    }, [location, dispatch]);

    return (
        <>
            <header className={classes.header}>
                <div className={classes.headerTitle}>
                    <Link to='/' className='nav-link'>
                        <span className='fancy-nav'>Cocktail Keeper</span>
                    </Link>
                </div>

                <div className={classes.headerControls}>
                    <div>
                        <Link to='/recipe' className='nav-link' title='Add a new recipe'>
                            <AddBoxOutlinedIcon fontSize='large' />
                        </Link>
                    </div>
                </div>
            </header>

            {
                state.bannerMessage &&
                <>
                    <Fade in={!!state.bannerMessage}>
                        <Alert severity={state.bannerSeverity}>{state.bannerMessage}</Alert>
                    </Fade>
                </>
            }
        </>
    )
}

export default Header;

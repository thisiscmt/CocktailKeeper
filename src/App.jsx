import React from 'react';
import { Container, Paper } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import Home from './pages/Home/Home.jsx';
import ViewRecipe from './pages/ViewRecipe/ViewRecipe.jsx';
import EditRecipe from './pages/EditRecipe/EditRecipe.jsx';
import Config from './pages/Config/Config.jsx';
import Preferences from './pages/Preferences/Preferences.jsx';
import Clean from './pages/Clean/Clean.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Store from './stores/mainStore.jsx';

const useStyles = makeStyles()(() => ({
    siteContainer: {
        display: 'flex !important',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '-webkit-fill-available',
        textAlign: 'center'
    },

    siteBackground: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '10px'
    }
}));

function App() {
    const { classes, cx } = useStyles();

    return (
        <Store>
            <BrowserRouter>
                <Container maxWidth='sm' disableGutters={true} className={cx(classes.siteContainer)}>
                    <Paper elevation={3} className={cx(classes.siteBackground)}>
                        <Header/>

                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/recipe/:recipeName' element={<ViewRecipe />} />
                            <Route path='/recipe' element={<EditRecipe />} />
                            <Route path='/recipe/:recipeName/edit' element={<EditRecipe />} />
                            <Route path='/config' element={<Config />} />
                            <Route path='/preferences' element={<Preferences />} />
                            <Route path='/clean' element={<Clean />} />
                            <Route element={<ErrorPage />} />
                        </Routes>

                        <Footer/>
                    </Paper>
                </Container>
            </BrowserRouter>
        </Store>
    );
}

export default App;

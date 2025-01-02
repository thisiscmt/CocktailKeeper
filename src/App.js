import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Paper } from '@mui/material';

import Home from './pages/Home/Home';
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import Config from './pages/Config/Config';
import Preferences from './pages/Preferences/Preferences';
import Clean from './pages/Clean/Clean';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Store from './stores/mainStore';
import './App.scss';

function App() {
    return (
        <main className='main-content'>
            <Store>
                <BrowserRouter>
                    <Paper elevation={5} data-testid='AppMainPaper'>
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
                </BrowserRouter>
            </Store>
        </main>
    );
}

export default App;

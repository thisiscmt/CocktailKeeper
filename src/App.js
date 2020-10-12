import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {Helmet} from 'react-helmet';

import Home from './pages/Home/Home';
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import Settings from './pages/Settings/Settings';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
    return (
        <div className='main-content'>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Cocktail Keeper</title>
                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
            </Helmet>

            <BrowserRouter>
                <Paper elevation={5}>
                    <Header/>

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/recipe/:recipeName' component={ViewRecipe} />
                        <Route exact path={['/recipe', '/recipe/:recipeName/edit']} component={EditRecipe} />
                        <Route exact path='/settings' component={Settings} />
                        <Route component={ErrorPage} />
                    </Switch>

                    <Footer/>
                </Paper>
            </BrowserRouter>
        </div>
    );
}

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Helmet} from "react-helmet";

import './App.css';
import Home from "./pages/Home/Home";
import ViewRecipe from "./pages/ViewRecipe/ViewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import Preferences from "./pages/Preferences/Preferences";

function App() {
    return (
        <div className="app main-content">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cocktail Keeper</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Helmet>

            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/recipe">
                        <ViewRecipe />
                    </Route>
                    <Route path="/recipe:name">
                        <EditRecipe />
                    </Route>
                    <Route path="/preferences">
                        <Preferences />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

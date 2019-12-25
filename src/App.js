import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Helmet} from "react-helmet";

import './App.css';
import Home from "./pages/Home/Home";
import ViewRecipe from "./pages/ViewRecipe/ViewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import Settings from "./pages/Settings/Settings";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="main-content">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cocktail Keeper</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Helmet>

            <BrowserRouter>
                <Header/>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/recipe:id">
                        <ViewRecipe />
                    </Route>
                    <Route path="/recipe/edit:id?">
                        <EditRecipe />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                </Switch>

                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;

import React from 'react';
import {Helmet} from "react-helmet";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import './App.css';

function App() {
    return (
        <div className="app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cocktail Keeper</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Helmet>

            <header className={'header'}>
                <div className={'header-title'}>Cocktail Keeper</div>

                <div className={'header-controls'}>
                    <AddBoxOutlinedIcon />
                </div>
            </header>

            <section className={'main-content'}>
                Main content
            </section>

            <footer className={'footer'}>
                Preferences
            </footer>
        </div>
    );
}

export default App;

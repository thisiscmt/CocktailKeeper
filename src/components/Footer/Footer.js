import React from 'react';
import { Link } from "react-router-dom";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className={'footer'}>
                <Link to={'/preferences'}>
                    Preferences
                </Link>
            </footer>
        )}
}

export default Footer;

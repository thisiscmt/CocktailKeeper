import React from 'react';
import {Link} from "react-router-dom";
import AddBoxOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className={'header'}>
                <div className={'header-title'}>Cocktail Keeper</div>

                <div className={'header-controls'}>
                    <Link to={'/recipe'}>
                        <AddBoxOutlinedIcon htmlColor={'DarkBlue'} />
                    </Link>
                </div>
            </header>
        )}
}

export default Header;

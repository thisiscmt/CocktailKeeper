import React from 'react';
import {Link} from "react-router-dom";
import {createStyles, withStyles} from "@material-ui/styles";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const styles = createStyles({
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

class Header extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <header className={classes.header}>
                <div className={classes.headerTitle}>
                    <Link to={'/'} className={'nav-link'}>
                        <span className={'fancy-nav'}>Cocktail Keeper</span>
                    </Link>
                </div>

                <div className={classes.headerControls}>
                    <div>
                        <Link to={'/recipe'} className={'nav-link'} title={'Add a new recipe'}>
                            <AddBoxOutlinedIcon fontSize={'large'} />
                        </Link>
                    </div>
                </div>
            </header>
        )}
}

export default withStyles(styles)(Header);

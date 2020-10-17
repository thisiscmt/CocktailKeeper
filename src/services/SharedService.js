import {createMuiTheme} from '@material-ui/core';

class SharedService {
    static buildThemeConfig = (recipe) => {
        if (recipe) {
            return createMuiTheme({
                palette: {
                    primary: {
                        main: recipe.textColor
                    }
                },
                overrides: {
                    MuiContainer: {
                        root: {
                            backgroundColor: recipe.backgroundColor,
                            paddingTop: '5px',
                            paddingBottom: '6px'
                        }
                    },
                    MuiButton: {
                        root: {
                            color: recipe.textColor
                        }
                    },
                    MuiCard: {
                        root: {
                            backgroundColor: recipe.backgroundColor,
                            border: 'none',
                            boxShadow: 'none',
                            color: recipe.textColor
                        }
                    },
                    MuiCardContent: {
                        root: {
                            padding: '4px 0 4px 0',
                            '&:last-child': {
                                paddingBottom: '4px'
                            }
                        }
                    },
                    MuiList: {
                        root: {
                            color: recipe.textColor
                        }
                    },
                    MuiInputBase: {
                        root: {
                            color: recipe.textColor
                        }
                    },
                    MuiDivider: {
                        root: {
                            marginTop: '10px',
                            marginBottom: '10px'
                        }
                    }
                }
            });
        } else {
            return createMuiTheme({
                palette: {
                    type: 'light'
                }
            });
        }
    }
}

export default SharedService;

import {createTheme} from '@material-ui/core/styles';

class SharedService {
    static getSettings = () => {
        const settingsJSON = localStorage.getItem('ck.settings');
        let settings = {};

        if (settingsJSON) {
            settings = JSON.parse(settingsJSON);
        } else {
            settings.defaultUnit = '0';
        }

        return settings;
    }

    static buildThemeConfig = (overrides) => {
        if (overrides) {
            return createTheme({
                palette: {
                    primary: {
                        main: overrides.textColor
                    }
                },
                props: {
                    MuiButtonBase: {
                        disableRipple: true
                    }
                },
                overrides: {
                    MuiContainer: {
                        root: {
                            backgroundColor: overrides.backgroundColor,
                            paddingTop: '5px',
                            paddingBottom: '6px'
                        }
                    },
                    MuiButton: {
                        root: {
                            color: overrides.textColor
                        }
                    },
                    MuiCard: {
                        root: {
                            backgroundColor: overrides.backgroundColor,
                            border: 'none',
                            boxShadow: 'none',
                            color: overrides.textColor
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
                            color: overrides.textColor
                        }
                    },
                    MuiInputBase: {
                        root: {
                            color: overrides.textColor
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
            return createTheme({
                palette: {
                    type: 'light'
                },
                props: {
                    MuiButtonBase: {
                        disableRipple: true
                    }
                }
            });
        }
    }
}

export default SharedService;

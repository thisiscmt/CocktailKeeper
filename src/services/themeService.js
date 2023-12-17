import { createTheme } from '@mui/material';

export const buildThemeConfig = (overrides) => {
    if (overrides) {
        return createTheme({
            palette: {
                primary: {
                    main: overrides.textColor
                }
            },
            components: {
                MuiContainer: {
                    styleOverrides: {
                        root: {
                            backgroundColor: overrides.backgroundColor,
                            paddingTop: '5px',
                            paddingBottom: '6px'
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            color: overrides.textColor
                        }
                    }
                },
                MuiButtonBase: {
                    defaultProps: {
                        disableRipple: true
                    }
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            backgroundColor: overrides.backgroundColor,
                            border: 'none',
                            boxShadow: 'none',
                            color: overrides.textColor
                        }
                    }
                },
                MuiCardContent: {
                    styleOverrides: {
                        root: {
                            padding: '4px 0 4px 0',
                            '&:last-child': {
                                paddingBottom: '4px'
                            }
                        }
                    }
                },
                MuiList: {
                    styleOverrides: {
                        root: {
                            color: overrides.textColor
                        }
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            color: overrides.textColor
                        }
                    }
                },
                MuiDivider: {
                    styleOverrides: {
                        root: {
                            marginTop: '10px',
                            marginBottom: '10px'
                        }
                    }
                }
            }
        });
    } else {
        return createTheme({
            palette: {
                type: 'light'
            },
            components: {
                MuiButtonBase: {
                    defaultProps: {
                        disableRipple: true
                    }
                },
            }
        });
    }
};

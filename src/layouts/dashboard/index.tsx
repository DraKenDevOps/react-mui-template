import { useLayoutEffect } from "react";
import {
    styled,
    Theme,
    CSSObject,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import { Toolbar, CssBaseline, Divider, IconButton } from "@mui/material";

import { Menu, ChevronLeft, ChevronRight } from "@mui/icons-material";

import { Outlet } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen } from "../../stores/features/drawer";
import { RootState } from "../../stores";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#1B75BA",
        },
        secondary: {
            main: "#666666",
        },
        warning: {
            main: "#FFC500",
        },
        info: {
            main: "#00BBFF",
        },
        success: {
            main: "#0AB163",
        },
    },
});

export default function MiniDrawer() {
    const { drawer, auth } = useSelector((state: RootState) => ({ ...state }));
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(setDrawerOpen({ open: true }));
    };

    const handleDrawerClose = () => {
        dispatch(setDrawerOpen({ open: false }));
    };

    useLayoutEffect(() => {
        // Clean up the event listener on unmount
        if (window.innerWidth <= 778) {
            handleDrawerClose();
        } else {
            handleDrawerOpen();
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" open={drawer.open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(drawer.open && { display: "none" }),
                            }}
                        >
                            <Menu />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={drawer.open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRight />
                            ) : (
                                <ChevronLeft />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <MenuBar />
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

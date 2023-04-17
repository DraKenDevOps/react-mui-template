import React, { useEffect, useState } from "react";

import {

    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../../stores";


export default function MenuItem({ items }: { items: any }) {
    const { pathname } = useLocation();
    const { drawer } = useSelector((state: RootState) => ({ ...state }));
    useEffect(() => { }, [drawer]);
    return (
        <>
            <OneItem items={items} pathname={pathname} open={drawer.open} />
        </>
    );
}


interface Props {
    items: any;
    pathname: any;
    open: boolean;
}
function OneItem({ items, pathname, open }: Props) {
    const active = {
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
        color: "#1A1A1A",
        backgroundColor: "#E8E8E8",
        "&:hover": {
            backgroundColor: "#ffffff",
        },
    };

    const unActive = {
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
        color: "#A0A0A0",
        "&:hover": {
            backgroundColor: "#ffffff",
        },
    };

    return (
        <>
            {items.icon && (
                <Link
                    to={items.path.toLowerCase()}
                    style={{ textDecoration: "none" }}
                >
                    <ListItemButton
                        sx={pathname === items.path ? active : unActive}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesomeIcon icon={items.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary={items.name}
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </Link>
            )}
        </>
    );
}
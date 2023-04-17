import { List } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import RouteAdmin from "../../../routes/admin";
// import RouteStaff from "../../../routes/staff";
import { RootState } from "../../../stores";
import MenuItem from "./MenuItem";

interface Props {}

const MenuBar: React.FC<Props> = () => {
    const { auth } = useSelector((state: RootState) => ({ ...state }));

    return (
        <>
            <List>
                {/* {(auth.role === "SuperAdmin" ||
                    auth.role === "Admin" ||
                    auth.role === "Staff") &&
                    RouteStaff.map((item, index) => (
                        <MenuItem items={item} key={index} />
                    ))} */}
                {(auth.role === "SuperAdmin" || auth.role === "Admin") &&
                    RouteAdmin.map((item, index) => (
                        <MenuItem items={item} key={index} />
                    ))}
            </List>
        </>
    );
};

export default MenuBar;

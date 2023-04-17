import { Box } from "@mui/material";
import React from "react";
import "../assets/css/spinner.css";

const Spinner = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-%50, -50%)",
                zIndex: 99999
            }}
        >
            <span className="loader"></span>

        </Box >
    );
};

export default Spinner;

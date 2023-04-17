import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Redirect = () => {
    const [Count, setCount] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);

        Count === 0 && navigate("/login");
        return () => clearInterval(interval);
    }, [Count, navigate]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "red",
                fontSize: "1.4rem",
            }}
        ></Box>
    );
};

export default Redirect;

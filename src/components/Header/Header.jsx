import React from "react";
import "react-js-stickynav/dist/index.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

import Navbar from "../../commons/Header/Navbar";
import banner from "../../assets/banner.jpg";

const Header = () => {
    return (
        <Box sx={{ backgroundColor: "#263238" }}>
            <img width="100%" height="200px" src={banner} alt="banner" />
            <div className="styl"></div>
            <Navbar />
        </Box>
    );
};

export default Header;

import React from "react";
import Box from "@mui/material/Box";
import Carrucel from "../../commons/Home/Carrucel";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const Home = () => {
    return (
        <div>
            <Divider light />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}></Stack>
            <Divider />
            <Box
                sx={{
                    bgcolor: "#607d8b",
                    color: "secondary.contrastText",
                    margin: 2,
                    fontWeight: "fontWeightLight",
                    justifyContent: "center",
                    flexDirection: "column",
                    p: 4,
                    textAlign: "center",
                }}
            >
                <h1>LOS LUGARES MAS TURISTICOS DE LA ARGENTINA</h1>
            </Box>

            <Carrucel />
        </div>
    );
};

export default Home;

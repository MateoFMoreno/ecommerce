import React, { useEffect, useState } from "react";
import CardsInfo from "../../commons/Home/CardsInfo";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { error } from "../../utils/toast";

function CardSearch() {
    const history = useHistory();
    const { type, name } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/products/search?type=${type}&name=${name}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setProducts(res.data);
                } else {
                    history.push("/");

                    error("Search not found");
                }
            })
            .catch(() => {
                history.push("/");

                error("Search not found");
            });
    }, [type, name]);

    return (
        <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", position: "relative", justifyContent: "space-around" }}>
                {products.length > 0 &&
                    products.map((e, i) => {
                        return <CardsInfo product={e} key={i} />;
                    })}
            </Box>
        </Box>
    );
}

export default CardSearch;

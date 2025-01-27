import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { removeFromBasket, setUser } from "../../state/user";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { success, error } from "../../utils/toast";
import { getTotal } from "../../utils/getTotal";

const axios = require("axios");

export default function BasketUser() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [basketLocalStorage, setBasketLocalStorage] = useState([]);

    useEffect(async () => {
        if (user._id) {
            const carrito = user.carrito;

            setBasket(carrito);

            carrito.length > 0 ? setTotal(getTotal(carrito)) : setTotal(0);
        } else {
            const carrito = JSON.parse(localStorage.getItem("basket")) || [];

            setBasket(carrito);

            carrito.length > 0 ? setTotal(getTotal(carrito)) : setTotal(0);
        }
    }, [user, basketLocalStorage]);

    const handleOnClick = async (id) => {
        if (user._id) {
            dispatch(removeFromBasket({ user: user._id, id: id })).then((res) => {
                const carrito = res.payload.carrito;

                setBasket(carrito);

                carrito.length > 0 ? setTotal(getTotal(carrito)) : setTotal(0);
            });
        } else {
            const carrito = JSON.parse(localStorage.getItem("basket")) || [];

            if (carrito.length > 0) {
                const idx = carrito.findIndex((e) => e._id === id);

                carrito.splice(idx, 1);

                localStorage.setItem("basket", JSON.stringify(carrito));

                setBasketLocalStorage(carrito);

                carrito.length > 0 ? setTotal(getTotal(carrito)) : setTotal(0);
            }
        }
    };

    const handleConfirm = () => {
        if (user._id) {
            axios
                .post(`/api/users/${user._id}/basket/confirm`)
                .then((res) => {
                    dispatch(setUser(res.data));

                    history.push("/");

                    success("Thank you for your purchase");
                })
                .catch(() => error("Upss! something has failed"));
        } else {
            history.push("/log");
            error("You need have logged");
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop: 3 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Units</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket &&
                        basket.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell align="right">{item.cantidad}</TableCell>
                                <TableCell align="right">$ {item.price}</TableCell>
                                <TableCell align="right">
                                    <IconButton variant="outlined" color="error" onClick={() => handleOnClick(item._id)}>
                                        <RemoveShoppingCartIcon />
                                        <h6>Remove</h6>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    <TableRow sx={{ bgcolor: "#607d8b" }}>
                        <TableCell rowSpan={3} />
                    </TableRow>
                    <TableRow sx={{ bgcolor: "#607d8b" }}>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">$ {total}</TableCell>
                        <TableCell align="right">
                            <Button onClick={handleConfirm} variant="contained" color="success">
                                Confirm
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

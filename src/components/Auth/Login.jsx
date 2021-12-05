import React from "react";
import LoginCommon from "../../commons/Auth/Login";
import { useState } from "react";
import { postUserLoged, setUser } from "../../state/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { success, error } from "../../utils/toast";
import axios from "axios";

const Login = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validCaptcha, setValidCaptcha] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePass = (e) => {
        setPassword(e.target.value);
    };

    const onSubmitCaptcha = () => {
        setValidCaptcha(true);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validCaptcha) return error("Please complete captcha");

        const userData = {
            email,
            password,
        };
        dispatch(postUserLoged(userData)).then(async (res) => {
            if (!res.error) {
                await axios.get(`/api/users/${res.payload[0]._id}/basket`);

                let basket = JSON.parse(localStorage.getItem("basket")) || "";
                if (basket) {
                    const newBasket = await axios.post(`/api/users/${res.payload[0]._id}/basket`, basket);

                    dispatch(setUser(newBasket.data));
                    localStorage.removeItem("basket");
                }
                history.push("/");
                success("Success Login. Welcome to Adventure");
            } else {
                error("Login has failed");
            }
        });
    };

    return (
        <LoginCommon
            onChangeEmail={onChangeEmail}
            onChangePass={onChangePass}
            onSubmit={onSubmit}
            onSubmitCaptcha={onSubmitCaptcha}
        />
    );
};

export default Login;

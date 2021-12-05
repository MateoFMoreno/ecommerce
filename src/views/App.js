import { useEffect } from "react";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import Navbar from "../components/Header/Header";

import Home from "../components/Home/Home";
import CardsProvinceOrCity from "../components/Search/CardsProvinceOrCity";
import GridNewUsers from "../components/Admin/Users/AdminUsers";
import CardsSearch from "../components/Search/CardSearch";
import Basket from "../components/Basket/Basket";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ViewProducts from "../components/Admin/Products/ViewProducts";
import ViewOrders from "../components/Admin/Orders/ViewOrders";
import AddReview from "../components/Admin/Products/AddReview";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("/api/auth/me")
            .then((res) => res.data[0])
            .then((user) => {
                dispatch(setUser(user));
            });
    }, []);

    return (
        <div>
            <Navbar />

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/search/:type/:name">
                    <CardsSearch />
                </Route>

                <Route path="/admin/users">
                    <GridNewUsers />
                </Route>

                <Route path="/admin/products">
                    <ViewProducts />
                </Route>

                <Route path="/admin/histories">
                    <ViewOrders />
                </Route>

                <Route path="/user/histories">
                    <ViewOrders type={"user"} />
                </Route>

                <Route path="/log">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/basket">
                    <Basket />
                </Route>

                <Route path="/info/:type/:name">
                    <CardsProvinceOrCity />
                </Route>

                <Route path="/product/review/:id">
                    <AddReview />
                </Route>

                <Route path="*">
                    <Redirect to="/" />
                </Route>

            </Switch>
        </div>
    );
}

export default App;

import axios from "axios";
import { Box } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";
import { success, error } from "../../../utils/toast";

const AddReview = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const { id } = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(2);

    const handleReset = () => {
        setRating(2);
        setReview("");
    };

    const handleSubmit = (e, rating, review, userId, _id) => {
        e.preventDefault();
        axios
            .post(`/api/products/${_id}/review`, { review: review, raiting: rating, _id: userId })
            .then(() => {
                success("Success added");

                history.push("/user/histories");
            })
            .catch(() => error("Failed add review"));

        handleReset();
    };

    const handleReview = (e) => {
        setReview(e.target.value);
    };

    return (
        <Box component="form" textAlign="center" bgcolor="#f5f5f5" minHeight="73.1vh">
            <Box
                sx={{
                    bgcolor: "#607d8b",
                    color: "secondary.contrastText",
                    margin: 2,
                    fontWeight: "fontWeightLight",
                    justifyContent: "center",
                    flexDirection: "column",
                    p: 4,
                    mt: 3,
                    textAlign: "center",
                }}
            >
                <h1>Add Review</h1>
            </Box>
            <Box>
                <TextField
                    sx={{ width: 500 }}
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows={3}
                    variant="standard"
                    value={review}
                    onChange={handleReview}
                />
            </Box>
            <Box alignItems="center" justifyContent="center" display="flex" mt={2}>
                <h3>Rating: </h3>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </Box>

            <Box textAlign="center" sx={{ mt: 3 }}>
                <Button variant="contained" onClick={(e) => handleSubmit(e, rating, review, user._id, id)}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default AddReview;

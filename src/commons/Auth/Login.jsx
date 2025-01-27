import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";


function Login({ onChangeEmail, onChangePass, onSubmit, onSubmitCaptcha }) {
    return (
        <div>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(https://logodix.com/logo/1877084.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={onChangeEmail}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={onChangePass}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                sx={{
                                    bgcolor: "#263238",
                                    "&:hover": {
                                        backgroundColor: "#263238",
                                        color: "#FFF",
                                    },
                                    mt: 3,
                                    mb: 2,
                                }}
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Sign in
                            </Button>
                              <ReCAPTCHA
                                sitekey="6LfiVUUdAAAAAI_wdCR4Pla-NqSXFAx8vIbfQslE"
                                onChange={(e) => onSubmitCaptcha(e)}
                               />

                            <Grid container justifyContent="flex-end"></Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
)}

export default Login

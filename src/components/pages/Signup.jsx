import {Button, Card, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";

function Signup() {
    return <div>
        <div style={{display: "flex", justifyContent: "center"} }>
            <Grid container style={{padding: "5vw"}}>
                <Grid item xs={12} md={6} lg={6}>
                    <SignupCard />
                </Grid>
                <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                    <img src={"https://imgs.search.brave.com/4cmSBeW_VwL5tR9BdJgaFYKZBLpyGcsiuyVbqh4WVb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAwMDQy/My84MzQwL2kvNjAw/L2RlcG9zaXRwaG90/b3NfODM0MDI3NTIt/c3RvY2stcGhvdG8t/bGlnaHQtYnVsYi5q/cGc"} width={"100%"}  alt={"Not Available"}/>
                </Grid>
            </Grid>
        </div>
    </div>
}

function SignupCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div>
        <div style={{paddingTop: 150, marginBottom: 10, display: "flex", justifyContent: "center"}}>
            <Typography variant={"h6"}>Welcome to Coursell. Sign up below.</Typography>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card
                variant={"outlined"}
                style={{width: 400, padding: 20}}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth={true}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <br/><br/>
                <TextField
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    fullWidth={true}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br/><br/>
                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        const r = await axios.post("http://localhost:3000/admin/signup", {
                            username,
                            password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        })

                        // Store the returned JWT token in the browser storage for further use
                        localStorage.setItem("token", r.data.token);
                        console.log(r.data);
                        window.location = "/"
                    }}>
                    Signup
                </Button>
            </Card>
        </div>
    </div>
}

export default Signup
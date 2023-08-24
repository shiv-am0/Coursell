import {Grid, Typography} from "@mui/material";

function Landing() {


    return <div>
        <div style={{display: "flex", justifyContent: "center"} }>
            <Grid container style={{padding: "5vw"}}>
                <Grid item xs={12} md={6} lg={6}>
                    <div style={{marginTop: 100}}>
                        <Typography variant={"h1"}>
                            Coursell Admin
                        </Typography>
                        <Typography variant={"h5"}>
                            A place to learn, earn and grow
                        </Typography>
                    </div>
                    <div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                    <img src={"https://imgs.search.brave.com/4cmSBeW_VwL5tR9BdJgaFYKZBLpyGcsiuyVbqh4WVb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAwMDQy/My84MzQwL2kvNjAw/L2RlcG9zaXRwaG90/b3NfODM0MDI3NTIt/c3RvY2stcGhvdG8t/bGlnaHQtYnVsYi5q/cGc"} width={"100%"}  alt={"Not Available"}/>
                </Grid>
            </Grid>
        </div>
    </div>
}

export default Landing;
import {Button, Card, Checkbox, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";

function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [published, setPublished] = useState(false);

    return <div>
        <div style={{paddingTop: 150, marginBottom: 10, display: "flex", justifyContent: "center"}}>
            <Typography variant={"h6"}>Enter the following course details.</Typography>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card
                variant={"outlined"}
                style={{width: 400, padding: 20}}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth={true}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <br/><br/>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth={true}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <br/><br/>
                <TextField
                    label="Price"
                    variant="outlined"
                    type={"number"}
                    fullWidth={true}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                <br/><br/>
                <TextField
                    label="Image Link"
                    defaultValue={"https://imgs.search.brave.com/ZcDzSDFwZGGGO_3XX-aMYQUdHclEGuI_Wb2xzRdbUmE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzAwLzQyLzAy/LzM2MF9GXzMwMDQy/MDI1MV9BckpYNlpk/Z2V2bmdmR3VYS2pB/QW1ONVpVejNDNWF6/Ni5qcGc"}
                    variant="outlined"
                    fullWidth={true}
                    onChange={(e) => {
                        setImageLink(e.target.value);
                    }}
                />
                <br/><br/>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e, val) => {
                                setPublished(e.target.checked);
                                console.log(published)
                            }}
                        />
                    }
                    label="Published"
                />
                <br/><br/>
                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        const r = await axios.post("http://localhost:3000/admin/courses", {
                            title,
                            description,
                            price,
                            imageLink,
                            published
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })

                        console.log(r);
                        if(r.status === 200) {
                            alert("Course Added successfully!");
                        }
                        else {
                            alert("Course addition failed. Please try again.");
                        }
                        console.log(r.data);
                    }}>
                    Add Course
                </Button>
            </Card>
        </div>

    </div>
}

export default CreateCourse;
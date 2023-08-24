import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../config.js";
import axios from "axios";

// This component is used to display the course details fetched from the backend as cards
export default function CourseCard({course}) {
    const navigate = useNavigate();

    return (
        <Card
            style={{
                margin: 10,
                width: 380,
                minHeight: 220,
                borderRadius: 20,
                marginRight: 50,
                paddingBottom: 15,
                zIndex: 2
            }}
            sx={{ maxWidth: 400}}>
            <CardMedia
                component="img"
                alt={course.title}
                height="140"
                image={course.imageLink}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                </Typography>
            </CardContent>
            <CardActions style={{marginLeft: 4}}>
                <Button
                    size="medium"
                    variant="contained"
                    onClick={() => {
                        navigate("/course/" + course._id);
                    }}
                >
                    Edit
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    onClick={async () => {
                        console.log(course);
                        const res = await axios.delete(`${BASE_URL}/admin/courses/${course._id}`, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })

                        console.log(res.data);
                        window.location.reload();
                        alert("Course deleted successfully!");
                    }}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

import {useEffect, useState} from "react";
import * as React from "react";
import CourseCard from "../common/CourseCard.jsx";
import {Grid} from "@mui/material";
import axios from "axios";

function ViewCourses() {
    const [courses, setCourses] = useState();

    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses", {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(r => {
            console.log(r.data);
            setCourses(r.data.course);
        })
        }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", margin: 35}}>
            <Grid container spacing={3}>
                {courses?.map((course, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <CourseCard
                            course={course}>
                        </CourseCard>
                    </Grid>
                ))}
            </Grid>
        </div>
}

export default ViewCourses;
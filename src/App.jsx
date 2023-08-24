import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './components/pages/Signup.jsx'
import './App.css'
import Login from "./components/pages/Login.jsx";
import Landing from "./components/pages/Landing.jsx";
import ViewCourses from "./components/pages/ViewCourses.jsx";
import CreateCourse from "./components/pages/CreateCourse.jsx";
import Appbar from "./components/common/Appbar.jsx";
import {RecoilRoot, useSetRecoilState} from 'recoil';
import {BASE_URL} from "./config.js";
import {userState} from "./store/atoms/users.js";
import axios from "axios";
import {useEffect} from "react";
import ModifyCourse from "./components/pages/ModifyCourse.jsx";

function App() {
  return (
      <RecoilRoot>
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#eeeeee"}}>
            <Router>
                <Appbar />
                <InitUser />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path={"/course/:courseId"} element={<ModifyCourse />} />
                    <Route path="/view courses" element={<ViewCourses />} />
                    <Route path="/create course" element={<CreateCourse />} />
                </Routes>
            </Router>
    </div>
      </RecoilRoot>
  )
}

function InitUser() {
    const setUser = useSetRecoilState(userState);

    const init = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(res.data.username) {
                setUser({
                    isLoading: false,
                    username: res.data.username
                });
            } else {
                setUser({
                    isLoading: false,
                    username: null
                });
            }
        } catch (e) {
            setUser({
                isLoading: false,
                userEmail: null
            });
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}

export default App

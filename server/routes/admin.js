const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Course, Admin } = require('../db');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    res.json({
        username: req.user.username
    })
})

router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const adminAlreadyExists = await Admin.findOne({username});
    if(adminAlreadyExists) {
        console.log("Admin already exists: " + adminAlreadyExists);
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        const newAdmin = new Admin({username, password});
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.body;
    const admin = await Admin.findOne({username, password});
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.post('/courses', authenticateJwt, async (req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
});

router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId.trim();
    const course = await Course.findById({_id: courseId});
    if(course) {
        res.json({ course });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to edit a course
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true});
    if (course) {
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

router.delete('/courses/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId.trim();
    const course = await Course.findOneAndDelete({_id: courseId});
    res.json({ message: 'Course deleted successfully' });
})

router.get('/courses', authenticateJwt, async (req, res) => {
    // logic to get all courses
    const course = await Course.find({});
    res.json({course});
});

module.exports = router;
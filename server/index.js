const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/user', userRouter);

const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "CourseApp" });

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
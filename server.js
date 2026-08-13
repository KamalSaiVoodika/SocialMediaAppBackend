

const express = require('express');

const connectDB = require('./config/db');

const authRouter = require('./routes/auth_route');


//define the port number the server will listen to

const PORT = 3000;

//create an instance of express application
const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, "0.0.0.0", function () {
    console.log(`Server is running on port ${PORT}`);
});

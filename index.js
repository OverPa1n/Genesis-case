const express = require('express');
const app = express();
const port = 8890;
const {getRate, subscribe, sendEmails} = require('./controllers/index');
const {json} = require("express");

app.use(json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/rate', getRate);
app.post('/subscribe', subscribe);
app.post('/sendEmails', sendEmails);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Customer = require('../database/schema/customer.js');

// db conncection
mongoose.connect(
    'mongodb://localhost:27017/rewards'
)
.then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => console.log(`db connection error: ${err.message}`));

app.use(cors());
// set up EJS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// set EJS as templating engine
app.set('view engine', 'ejs');

const read = async (req, res) => {
    console.log('read')
    let useId = req.params.id ? req.params.id : null;
    let query;
    if (useId) {
        query = {"useId": {$regex: useId}}
    } else {
        query = {};
    }
    console.log(query,'query')
    await Customer.find(query)
    .exec((err, data) => {
        console.log(data, 'data')
        if (err) {
            return res.status(400).json({
                err: err
            })
        }
        res.json({
            data: data
        })
    })
}
app.get('/read/:id', read);
app.get('/read', read);

app.listen(8000, "0.0.0.0", () => console.log('server is running on port 8000'));
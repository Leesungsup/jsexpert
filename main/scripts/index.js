const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let mysql = require('mysql');

let connection = mysql.createConnection(
    {host: 'ohunm00fjsjs1uzy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', user: 'nmbhxr4vae2dlz7s', password: 'tm8gl5st9wynumby', database: 'yo5t73p2sfd3a0ht'}
);
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/read', (req, res) => {
    connection.query('SELECT * FROM new_table', function (error, results) {
        if (error) {
            console.error(error);
        }
        // console.log(results);
        return res.send(results);
    });
});
app.post('/read', (req, res) => {
    const name = req.body.station || '';
    if (!name.length) {
        return res
            .status(400)
            .json({error: 'Incorrect name'});
    }
    connection.query(
        'SELECT station,(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(rad' +
                'ians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS ' +
                'distance FROM new_table HAVING distance <= 5 ORDER BY distance',
        [
            req.body.latitude, req.body.longitude, req.body.latitude
        ],
        function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            // console.log(results);
            return res.send(results);
        }
    );
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
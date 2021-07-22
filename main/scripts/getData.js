let axios = require('axios');
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

    let config = {
        method: 'get',
        url: 'http://api.data.go.kr/openapi/tn_pubr_public_free_mlsv_api?serviceKey=b7%2BNGZ' +
                '%2BxRbFG9ApCFAM3aCNPNwrEvmCyzXzVfIfbaXEpSDY8kSqxnU9j3eUAkZYKaVVzIlZMscxVYmyHKO' +
                'rarg%3D%3D&pageNo=1&numOfRows=10&type=json',
        headers: {
            'Cookie': 'SCOUTER=x4n12f8688mjeh'
        }
    };
    axios(config)
        .then(async (res) => {
            const max = res.data.response.body.items.length;
            // console.log(JSON.stringify(res.data.response.body.items));
            for (let index = 0; index < max; index++) {
                // console.log(index, JSON.stringify(res.data.response.body.items[index]));
                let read = JSON.stringify(res.data.response.body.items[index]);
                let data = JSON.parse(read);
                // console.log(data);

                connection.query(
                    'INSERT INTO new_table(idnew_table, station, longitude, latitude) VALUES(?,?,?,' +
                            '?)',
                    [
                        index + 6,
                        data.fcltyNm,
                        data.longitude,
                        data.latitude
                    ],
                    function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                        console.log(results);
                    }
                );
            }
            connection.end();
        })
        .catch(function (error) {
            console.log(error);
        });
});
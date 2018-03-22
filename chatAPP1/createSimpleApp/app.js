const express = require('express');
const app = express();
var request = require('request');
var info = "";
//var other = "\s(?=";
//var pricePhrases = "/(price|value|cost|amount|worth|rate)/";
var currencies = /(BTC|ETH|XRP|LTC|BCH|ETC|TRX|EOS|XMR|NEO)/;
//var pricethencurrency = /(price|value|cost|amount|worth|rate)\s(?=Bitcoin|Ethereum|Litecoin|Ripple|Ethereum Classic|Bitcoin Cash|Tronix|EOS|Monero|Neo)/gi;
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(8080);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
        console.log(data.message.match(currencies) != null);
        if (data.message.match(currencies) != null) {
            var curr = data.message.match(currencies);
            var price = request('https://min-api.cryptocompare.com/data/price?fsym=' + curr[0] + '&tsyms=GBP')
            price.on('data', function(chunk) {
                info = info + chunk;
            });

            price.on('end', function(chunk) {
                var msginfo = JSON.parse(info);

                console.log(msginfo["GBP"]);
                io.sockets.emit('new_message', { message: "£" + msginfo["GBP"], username: "Price of " + curr[0] });
                info = "";
            })
        }
    })


    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    })
})

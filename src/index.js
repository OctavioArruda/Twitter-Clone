const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://goweek:goweek123@ds135305.mlab.com:35305/goweek-backend', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json()); // Tell express that we'll use json for all requisitions
app.use(require('./routes'));

server.listen(port, () => {
    console.log(`Server has started on port ${port}.`);
});
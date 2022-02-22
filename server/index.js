const express = require('express')
const app = express()
const port = 5100
const config = require('./config/key');
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));


const mongoose = require('mongoose')
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true, useUnifiedTopology: true
        }).then(()=> console.log('MongoDB connected'))
          .catch(err => console.log(err))

app.listen(port, () => console.log(`app listening on port ${port}!`))




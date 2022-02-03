const express = require('express')
const app = express()
const port = 5100

const mongoose = require('mongoose')
        mongoose.connect('mongodb+srv://titi:yj8339@sc.hc7cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        }).then(()=> console.log('MongoDB connected'))
          .catch(err => console.log(err))

        
app.get('/', (req, res) => res.send('hello world'))

app.listen(port, () => console.log(`app listening on port ${port}!`))




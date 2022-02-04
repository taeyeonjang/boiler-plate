const express = require('express')
const app = express()
const port = 5100
const { User } = require("./models/User");
const config = require('./config/key');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const mongoose = require('mongoose')
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true, useUnifiedTopology: true
        }).then(()=> console.log('MongoDB connected'))
          .catch(err => console.log(err))

        
app.get('/', (req, res) => res.send('hello world223123'))

app.post('/register', (req, res) =>{
    //회원가입시 입력했던 정보들을 클라이언트에서 가져오면
    //그것들을 Db에 넣어준다
    const user = new User(req.body)
    //req.body에 {id, password 등 정보갸 담겨져있다} body-parser때문에 사용가능

    user.save((err, userInfo) => {
        // save 는 mongodb method이고 req.body에 저장된 정보를 저장 
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
    
})

app.listen(port, () => console.log(`app listening on port ${port}!`))




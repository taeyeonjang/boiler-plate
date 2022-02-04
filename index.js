const express = require('express')
const app = express()
const port = 5100
const { User } = require("./models/User");
const config = require('./config/key');
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

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


app.post('/login', (req, res) =>{

    //요청된 email을 데이터베이스에 있는지 찾는다,

    User.findOne({ email: req.body.email}, (err, userInfo) => {
        //findOne 은 mongoDB 제공 함수, 여러 DB중 (회원가입된) email이 입력받은 email이 있따면
        //그 줄의 정보를 userInfo로 가져온다
        if(!userInfo) {
            return res.json({
                loginSuccess : false,
                message: "이메일이 틀렸습니다."
            })
        }

     //요청한 email이 있다면 비밀번호도 확인한다.     
        
        userInfo.comparePassword(req.body.password, (err, isMatch)=>{

            //findOne으로 찾은 userInfo중 id, password 등 은 req.body.로 찾을수잇다
            if(!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다"})
            
             //비밀번호까지 맞다면 토큰을 생성한다.
            userInfo.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                //token을 쿠키에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })

        })
            
    })

   

   


})

app.listen(port, () => console.log(`app listening on port ${port}!`))




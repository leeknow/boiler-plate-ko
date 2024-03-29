// 1. lsof - i tcp: 5000
// 2. kill -9 {PID}
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { User } = require("./models/User");
const { Shop } = require("./models/Shop");

const config = require("./config/key");
const { auth } = require("./middleware/auth");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    // 허락하고자 하는 요청 주소
    origin: ["http://localhost:3000"],
    // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
    credentials: true,
  }),
);
// "dev": "concurrently \"npm run start:dev\" \"cd ../client && npm run start\"",
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(">>>>> error", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

app.post("/api/users/register", (req, res) => {
  // 회원가입 할때 필요한 정보를 client에서 가져오면
  // 그것들을 DB에 넣어준다.
  const user = new User(req.body);

  // let session = await mongoose.startSession();

  // await session.withTransaction(() => {
  //   // kim의 계좌에서 인출
  //   await Account.update({ name: 'kim' },
  //     { $inc : { money: 100 } },
  //     { new: true }
  //   ).session(session);
  //   // choi의 계좌에 송금
  //   await Account.update({ name: 'choi' },
  //     { $inc: { money: -100 } },
  //     { new: true }
  //   ).session(session);
  // });
  // session.endSession();

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });

  user.userTypeCode == "SHOP" &&
    (function (shop) {
      shop.save((err, shopInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
        });
      });
    })(new Shop(req.body));
});

app.post("/api/users/register", (req, res) => {
  // 회원가입 할때 필요한 정보를 client에서 가져오면
  // 그것들을 DB에 넣어준다.
  console.log(">>>>> OK", req.body);
  // const user = new User(req.body);

  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true,
  //   });
  // });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 비밀번호까지 맞다면 Token을 생성
      user.generateToken((err, user) => {
        if (err) res.status(400).send(err);
        // 토큰을 저장한다. 어디에 ? - 쿠키, 로컬 스토리지
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// role 0이면 일반유저, 0이 아니면 관리자
app.get("/api/users/auth", auth, (req, res) => {
  // 여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    else
      return res.status(200).send({
        success: true,
      });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// mongodb+srv://David:<password>@boilerplate.log1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

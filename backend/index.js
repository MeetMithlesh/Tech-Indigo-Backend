const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/db.js");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routes/register.js");
const paymentRouter = require("./routes/payment.js");
const quizRouter = require("./routes/quiz.js");

app.use(cors(
    {origin:'https://tech-indigo-event.vercel.app'}
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../tech-indigo")));
app.use(express.json());

app.use("/api", userRouter);
// app.use("/api", paymentRouter);
app.use('/api', quizRouter);

// app.get("/api", (req, res) => {
//     res.sendFile(path.join(__dirname, "../tech-indigo/index.html"));
//     });
app.get("/api/quiz", (req, res) => {
    // res.sendFile(path.join(__dirname, "../tech-indigo/quiz.html"));
    res.redirect('https://tech-indigo-event.vercel.app/quiz.html')
    });

app.get("/api/developers", (req, res) => {
    // res.sendFile(path.join(__dirname, "../tech-indigo/developers.html"));
    res.redirect('https://tech-indigo-event.vercel.app/developers.html')
    });


app.listen(port, () => console.log(`Listening on port ${port}`));

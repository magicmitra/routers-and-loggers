require('dotenv').config();
const express = require('express');
const path = require('path');
// const logger = require('./middleware/logger');
// const commentData = require('./data');
const commentsRouter = require('./routes/comments');

const app = express();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// body parser middleware
app.use(express.json());
// form data
app.use(express.urlencoded({extended: false}));

// set up middleware, logger middleware
// app.use(logger);

// static middleware
app.use(express.static(path.join(__dirname, "public")));

// routing, setting endpoints after all the middleware]
app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


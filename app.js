require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");
const protectedRoutes = require('./routes/protectedRoutes');
const apiInfoRoutes = require('./routes/apiInfoRoutes');
const authRoutes = require("./routes/authRoutes");

const { PORT } = require("./config/constants");
const { swaggerUi, specs } = require('./config/swagger');
const { getAccessToken } = require("./services/tokenService");

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// Use routes
app.use('/', apiInfoRoutes);
app.use("/api", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/protected', protectedRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  // const token = await getAccessToken();
  // console.log(token)
});

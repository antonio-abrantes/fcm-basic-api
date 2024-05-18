const express = require("express");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");
const { PORT } = require("./config/constants");
const { getAccessToken } = require("./services/tokenService");

const app = express();

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

// Use notification routes
app.use("/api", notificationRoutes);

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

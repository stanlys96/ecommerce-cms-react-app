const env = process.env.NODE_ENV;
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

if (env != 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});

module.exports = app;
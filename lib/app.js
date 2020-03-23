'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

module.exports = app;

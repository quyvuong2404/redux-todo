"use strict";
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';

import config from './webpack.config';
import todos from './server/routes/todos';
import user from './server/routes/user';

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

import mongoConfig from './server/config/mongo';
mongoose.Promise = global.Promise;
mongoose.connect(mongoConfig.url, (error) => {
	if (error) {
		console.log('Please make sure Mongodb is installed and running');
		throw error;
	}
});

// middeware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// route
app.use('/api', todos);
app.use('/api', user);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7777, 'localhost', function(err){
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on port 7777');
});

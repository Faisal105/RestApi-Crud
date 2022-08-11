const express = require('express');
const app = express();
const dotenv = require('dotenv');
require('dotenv').config();
const PORT = process.env.PORT;
console.log(PORT);
app.use(express.json());
const restRoute = require('./routes/TodoAPi');
app.use('/api', restRoute);
app.use((err, req, res, next) => {
	console.log('error callback', err);
	res.status(err.status).json({ error: true, message: err.message });
});

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

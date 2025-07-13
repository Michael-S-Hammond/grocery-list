import express from 'express';

const app = express();
const port = 3000;

// Allow all cross origin for development and testing. This should be refined later.
// Resource: https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', (req, res) => {
	res.send('Hello from TypeScript Node.js Backend!');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

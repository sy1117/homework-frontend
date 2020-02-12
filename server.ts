const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')

const app = express();
let bundler = new Bundler('./index.html')
const PORT = process.env.PORT || 8080;

// app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});


app.use(
    '/api',
    proxy({
        target : 'http://localhost:3000',
        changeOrigin: true,
        // secure: true,
        pathRewrite: {
            '^/api' : ''
        },
    })
)

app.use(bundler.middleware())

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

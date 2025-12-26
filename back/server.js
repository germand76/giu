const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const http = require('http');
require('dotenv').config();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../front/src/'));

app.use('/admin/', express.static(path.join(__dirname, '../admin')));
app.use(express.static(path.join(__dirname, '../admin/public')));
app.use(express.static(path.join(__dirname, '../front/public')));


const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes); 

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
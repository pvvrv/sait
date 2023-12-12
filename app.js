const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const formData = req.body;
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка чтения файла базы данных.');
        }
        let database = JSON.parse(data);
        database.push(formData);
        fs.writeFile('data.json', JSON.stringify(database, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Ошибка записи в файл базы данных.');
            }
            res.redirect('index.html');
        });
    });
});

app.listen(port, () => {
    console.log(`Зайди на порт localhost:${port}`);
});

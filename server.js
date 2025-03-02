const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Путь к файлу, где будет храниться счетчик просмотров
const counterFilePath = path.join(__dirname, 'counter.json');

// Функция для чтения счетчика из файла
function readCounter() {
    if (!fs.existsSync(counterFilePath)) {
        return {};
    }
    const data = fs.readFileSync(counterFilePath, 'utf8');
    return JSON.parse(data);
}

// Функция для записи счетчика в файл
function writeCounter(counter) {
    fs.writeFileSync(counterFilePath, JSON.stringify(counter, null, 2));
}

// Обработчик для главной страницы
app.get('/', (req, res) => {
    const counter = readCounter();
    counter['/'] = (counter['/'] || 0) + 1;
    writeCounter(counter);
    res.send(`<h1>Главная страница</h1>
        <p>Просмотров: ${counter['/']}</p>
        <a href="/about">Перейти на страницу "О нас"</a>`);
});

// Обработчик для страницы "О нас"
app.get('/about', (req, res) => {
    const counter = readCounter();
    counter['/about'] = (counter['/about'] || 0) + 1;
    writeCounter(counter);
    res.send(`<h1>О нас</h1>
        <p>Просмотров: ${counter['/about']}</p>
        <a href="/">Вернуться на главную страницу</a>`);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
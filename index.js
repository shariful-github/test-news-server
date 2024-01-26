const express = require('express')
var cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

const categories = require('./data/categories.json');
const news = require('./data/news.json')

app.get('/', (req, res)=>{
    res.send('Dragon is running');
})

app.get('/categories', (req, res)=>{
    res.send(categories);
})

// sending all news
app.get('/news', (req, res) =>{
    res.send(news);
})

// sending specific news according to id
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    const selectedNews = news.find(n => n._id === id);
    res.send(selectedNews);
})

// sending news according to category
app.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    if(id === '0'){
        res.send(news);
    }
    else{
        const categorisedNews = news.filter( n => n.category_id === id);
        res.send(categorisedNews);
    }
})

app.listen(port, ()=>{
    console.log(`Dragon api is running on port: ${port}`);
})
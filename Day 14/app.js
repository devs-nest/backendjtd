const express = require('express');
const path = require('path');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jtd',
    password: '123',
    port: 5433,
});

const app = express();
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname, 'views'))

app.locals.cheers = "YAYYY"
app.locals.titleForPage = "JTD BACKEND"
app.locals.formatDate = (date) =>{
    return new Date(date).toLocaleDateString();
}

app.get('/',(req,res) =>{
    const data = { title_test: 'Home Page', message: 'Welcome to EJS Rendering!'};
    username = "User1"
    if(username === "Nirbhay"){
        data['css_styles'] = 'new_styles.css'
    }
    else{
        data['css_styles'] = 'styles.css'
    }
    console.log(data)
    res.render('index', data);
});

app.get('/about', (req, res) => {
    const data = { title: 'About Page', 
        description: 'This is an example of EJS rendering in Express.',
        date : new Date(),
        values: [1,2,3,4,5,6,7],
    };
    res.render('about', data);
});

app.get('/items', async (req, res) => {
    await client.connect()
    const items = await client.query("Select * from items");
    await client.end()
    console.log(items.rows)
    // const data = { title: 'About Page', description: 'This is an example of EJS rendering in Express.' };
    res.render('items', {"items":items.rows});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

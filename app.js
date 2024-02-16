import 'dotenv/config'

import express from  "express"
import bodyParser from 'body-parser';

const app = express();

let tasks = ["Drink Coffee", "Write Code", "Go Sleep"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.send("Welcome to the API!");

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric", 
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render('list', {listTitle : day, newListItems : tasks});
});

app.post('/', (req, res) => {

    // console.log(req.body);
    let task = req.body.newTask;
    // console.log(task);

    if(req.body.list === 'Work')
    {
        workItems.push(task);

        res.redirect('/work');
    }
    else{
        tasks.push(task);

        res.redirect('/');
    }
});

app.get('/work', (req, res) => {
    res.render('list', {listTitle : "Work Title", newListItems : workItems});
});

app.post('/work', (req, res) => {
    let task = req.body.newTask;
    workItems.push(task);
    res.redirect('/');
})

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
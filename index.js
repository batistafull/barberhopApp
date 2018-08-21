const express = require('express');
const fs = require('fs');
const app = express();
const archivo = __dirname + '/db/model.json';


app.get('/', (req, res) => {
        res.send('API REST');
});

app.get('/:nombre/:tel/:service', (req, res) => {
    var user = '';
    fs.readFile(archivo, 'utf-8', (err, data) => {
        user = JSON.stringify(data);
        user = user.replace('"[', '[');
        user = user.replace(']"', '');
        user = user.replace(/\\\"/g, '"');
        if(JSON.parse(data).length === 0){
            user = user +'{"nombre":"' + req.params.nombre + '", "tel": "' + req.params.tel + '", "service": "' + req.params.service + '"}]';
        }else{
            user = user +',{"nombre":"' + req.params.nombre + '", "tel": "' + req.params.tel + '", "service": "' + req.params.service + '"}]';
        }
        fs.writeFile(archivo, user, (err) =>{
            res.send(user)
        });
    })
});
app.get('/reset', (req, res) => {
    fs.writeFile(archivo, '[]', (err) =>{
        res.send('Lista reiniciada <br /> <a href="/">volver</a>');
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Conectado!!!')
});
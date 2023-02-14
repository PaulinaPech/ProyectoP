const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('uuid');

const json_products = fs.readFileSync('src/products.json', 'utf-8');
let products = JSON.parse(json_products);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        products
    });
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

router.post('/new-entry', (req, res)=>{
    const { name, precio, stock, image} = req.body;
    if (!name || !precio || !stock || !image){
        res.status(400).send('Debe llenar titulo, precio, stock e imagen');
        return;
    }
    let newProduct = {
        id: uuid,
        name, 
        precio,
        stock,
        image
    };
    products.push(newProduct);
    const json_products = JSON.stringify(products);
    fs.writeFileSync('src/products.json', json_products, 'utf-8');
    res.redirect('/');
});

router.get('/delete/:id', (req, res)=>{
    products = products.filter(product => product.id != req.params.id);
    const json_products = JSON.stringify(products);
    fs.writeFileSync('src/products.json', json_products, 'utf-8');
    res.redirect('/');
});

module.exports = router;

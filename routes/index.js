var conn = require('./../inc/db')
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations')
var contacts = require('./../inc/contacts');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => { /** Se a promessa for aceita retorna o results */


      res.render('index', {
      title: 'Restaurante Saboroso',
      menus: results,   // atribui o results na variavel menus
      isHome: true            

    });
  });

});

router.get('/contacts', function (req, res, next) {

  contacts.render(req, res);

});



router.post('/contacts', function (req, res, next) {



  if(!req.body.name){
    contacts.render(req, res, "Digite o nome");
  }else if(!req.body.email){
    contacts.render(req, res, "Digite o e-mail");
  }else if(!req.body.message){
    contacts.render(req, res, "Escreva uma mensagem");
  }else{


    contacts.save(req.body).then(results =>{ /** Tratamento final da promisse, se deu certo. 
    Dentro do save tem a promisse, entao o then trata esse resultado. */

req.body = {};

contacts.render(req, res, null, "Contato enviado com sucessso!");

}).catch(err=>{

contacts.render(req, res, err);

})
}

});






router.get('/menus', function (req, res, next) {

  menus.getMenus().then(results => {


    res.render('menus', {
      title: 'Menus - Restaurante Saboroso',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results


    });

  });

});





router.get('/reservations', function (req, res, next) {

reservations.render(req,res);

  });




router.post('/reservations', function (req, res, next) {

 

  if(!req.body.name){
    reservations.render(req, res, "Digite o nome");
  }else if(!req.body.email){
    reservations.render(req, res, "Digite o e-mail");
  }else if(!req.body.people){
      reservations.render(req, res, "Selecione o número de pessoas");
  }else if(!req.body.date){
    reservations.render(req, res, "Selecione uma data");
  }else if(!req.body.time){
    reservations.render(req, res, "Selecione uma hora");
  }else{

    reservations.save(req.body).then(results =>{ /** Tratamento final da promisse, se deu certo. 
                                                      Dentro do save tem a promisse, entao o then trata esse resultado. */

      req.body = {};

      reservations.render(req, res, null, "Reserva realizada com sucessso!");

    }).catch(err=>{

      reservations.render(req, res, err);

    })
  }


});




router.get('/services', function (req, res, next) {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'

  });

});


module.exports = router;

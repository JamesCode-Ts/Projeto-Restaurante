var conn = require('./db')

module.exports = {

    render(req, res, error, success){ // O render serve para renderizar, ou seja, jogar as informaçõs na tela.

    res.render('contacts', {
        title: 'Contato - Restaurante Saboroso',
        background: 'images/img_bg_3.jpg',
        body: req.body,
        error,
        success,
        h1: "Diga um Oi!"
    
      });
    },



    save(fields){

        return new Promise((resolve, reject)=>{
  
          conn.query(`
          INSERT INTO tb_contacts (name, email , message)
          VALUE(?, ?, ?)      
          `,[
    
            fields.name,
            fields.email,
            fields.message

          ], (err, results)=>{
    
               if(err){
  
                console.log(err);
  
                reject(err);
               }else{
  
                resolve(results);
               }
          });
    
        });
  
  
      }

}
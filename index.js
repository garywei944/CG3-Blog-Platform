
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  })
  .post('/order', (req, res) => {
      const first_name = req.body.first;
      const last_name = req.body.last;
      let entree = req.body.entree;
      let sideList = getSides(req.body);

      if (validateMenu(first_name, last_name, entree, sideList)) {
        res.redirect('/confirmation.html');
      } else {
        res.redirect('/menu.html');
      }
  })
  .post('/confirm', (req, res) => {
      console.log(req.body);
        
      res.redirect('/customerstatus.html');
  })
  .post('/status', (req, res) => {
      console.log(req.body);

      res.redirect('/customerstatus.html');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function validateMenu(first_name, last_name, entree, sideList) {
    let valid = false;

    if (first_name.length != 0 &&
        last_name.length != 0 && 
        entree != undefined && 
        sides.length === 3) {
        valid = true;
    }

    return valid;
}

function getSides(body) {
    sides = [];
    
    if (body.item0 === "on")
        sides.push("Corn Bread")
    if (body.item1 === "on")
        sides.push("Creamed Corn")
    if (body.item2 === "on")
        sides.push("Green Beans")
    if (body.item3 === "on")
        sides.push("Mashed Potatos")
    if (body.item4 === "on")
        sides.push("Baked Beans")

    return sides;
}

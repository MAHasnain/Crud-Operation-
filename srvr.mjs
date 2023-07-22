import express from 'express';
import { nanoid } from 'nanoid';

const app = express();
app.use(express.json());


let products = [
 {
  id: nanoid(),
  product: "mobile",
  name: "Samsung",
  price: "45000 Rs",
  description: "samsung has no competition"
 },
 {
  id: nanoid(),
  product: "book",
  name: "think and grow rich",
  price: "850 Rs",
  description: "Napoleon hill is the author of this book"
 },
];

// app.get ('/products', (req, res)=> {
//   res.send({
//     message : "all products",
//     data : products
//   })
// });

// app.get ('/product/:id', (req, res)=> {
//   console.log(typeof req.params.id);

//   if (isNaN(req.params.id)) {
//     res.status(403).send("invalid product id");    
//   }
//   let idFound = false;
//   for (let i = 0; i < products.length; i++) {
//     if (product[i].id ===req.params.id) {
//       isFound = i;
//       break;
//     }
//   };

//   if (isFound === false) {
//     res.status(404).send("product not found")
//   } else {
//     res.send({
//       message : "product found with id :" +  products[isFound].id,
//       data : products[isFound]
//     });
//   }
// })

/*
app.get ('/products', (req, res)=> {
  res.send({
    message : "all products",
    data : products
  })
});

app.get ('/product/:id', (req, res)=> {                        
  console.log(typeof req.params.id);

  if (isNaN(req.params.id)) {                                  //// agr req.params.id number nhi hai then body me 
    res.status(403).send("invalid product id")                 //// response me status 403 send hoga or msg sent hoga (invalid product id)
  }
  let isFound = false;                                         //// product found krne k liye variable me by default false store karna hai      
  for (let i = 0; i < products.length; i++) {                  //// array se product k liye loop chalana h then body        
    if (products[i].id === req.params.id) {                    ////  i=index  (if ki) condition me (products) array me mojud product ki id  === req.params.id k 
      isFound = i;                                             //// isfound  me product ka index store kr diya then 
      break;                                                   //// loop break kr diya
    }
  }

  if (isFound === false) {                                     //// for finding product if ki condition      
    res.status(404);
    res.send({
      message : "products not found"
    })    
  }else {
    res.send({
      message : "product found with id:" + products[isFound].id,
      data : products[isFound]
    })
  };
});

*/


// app.get ('/products', (req, res)=> {
//   res.send({
//     message : "all products",
//     data : products
//   })
// });

// app.get('/product/:id', (req, res)=> {
//   console.log(typeof req.params.id);
  
//   if (isNaN(req.params.id)) {
//     res.status(403).send("invalid product id")
//   }

//   let isFound = false;
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id === req.params.id) {
//       isFound = i;
//       break;
//     }
//   }

//   if (isFound === false) {
//     res.status(404)
//     res.send({
//       message : "product not found"
//     })
//   } else {
//     res.send ({
//       message : "product found with id" + products[isFound].id,
//       data : products[isFound]
//     })
//   }
// });



// app.post ('/product', (req, res) => {
//   if (req.body.name || req.body.price || req.body.description) {
//     res.send(`required parameters missing, example JSON request body : {
//       name : abc,
//       price : 123$,
//       description : abc product description
//     }`);
//     return;
//   }

//   products.push({
//     id : nanoid(),
//     name : req.body.name,
//     price : req.body.price,
//     description : req.body.description
//   })
//   res.status(201).send({ message : "product created"})
// });




app.get('/products', (req, res)=> {
  res.send({
    message : "all products",
    data : products
  })  
});  

app.get ('/product/:id', (req, res)=> {
  console.log(typeof req.params.id);

  if (isNaN(req.params.id)) {
    res.status(403).send("invalid product id")    
  }  

  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i
      break;
    }   
  }  

  if (isFound === false) {
    res.status(404);
    res.send ({
      message : "product not found"
    });  
  } else {
    res.send({
      message : "product found with id:" + products[i].id,
      data : products[isFound]
    })  
  }  
});  

// app.post('/product', (req, res)=> {
//   if (!req.body.name || !req.body.price || !req.body.description) {
//     res.send(` required parameters missing, example JSON request body : {
//       name : abc,
//       price : 123$,
//       description : abc product description
//     }`);
//   }
//   return;

//   products.push({
//     id : nanoid(),
//     name : req.body.name,
//     price : req.body.price,
//     description : req.body.description
//   })
//   res.status(201).send({
//     message : "product created"
//   })
// });



// app.post('/product', (req, res)=> {
//   if (!req.body.name || !req.body.price || !req.body.description) {
//     res.status(403).send (`required parameters are missing, example JSON request body :
//     {
//       name : abc,
//       price : 123$,
//       description : abc price description
//     }`)
//     return;
//   }

//   products.push({
//     id : nanoid(),
//     name : req.body.name,
//     price : req.body.price,
//     description : req.body.description
//   })
//   res.status(201);
//   res.send ({ message : "product created" })
// })


// app.put('/product/:id', (req, res)=> {
//   if (!req.body.name && !req.body.price && !req.body.description) {
//     res.status(403).send(`required parameters are missing.
//     atleast one parameter is required : name, price or description to complete update
//     example JSON request body
//     {
//       name : abc,
//       price : 123$
//       description : abc product description
//     }`);
//   }

//   let isFound = false;
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id === req.params.id) {
//       isFound = i;
//       break;      
//     }
//   }

//   if (isFound === false) {
//     res.status(404)
//     res.send({
//       message : "product not found"
//     })
//   } else {

//     if (req.body.name) products[isFound].name = req.body.name 
//     if (req.body.price) products[isFound].price = req.body.price 
//     if (req.body.description) products[isFound].description = req.body.description

//     res.send({
//       message : "product is updated with id" + products[isFound].id,
//       data : products[isFound]
//     }) 
//   }
// })



app.put ('/product/:id', (req, res)=> {
  if (!req.body.name && !req.body.price && !req.body.description) {
    res.send(`required parameters missing 
    atleast one parameter is required : name, price, or description to complete update 
    example JSON request body
    {
      name : abc,
      price : 123$,
      description : abc description
    }`);
  }

  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(403);
    res.send({
      message : "product not found"
    })
  }else{
    if(req.body.name) products[isFound].name = req.body.name
    if(req.body.price) products[isFound].price = req.body.price;
    if (req.body.description) products[isFound].description = req.body.description;
    res.send({
      message : "product found with id : " + products[isFound],
      data : products[isFound]
    })
  }
});


// app.delete('/product/:id', (req, res)=> {

//   let isFound = false;

//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id === req.params.id) {
//       isFound = i;
//       break;
//     }
//   }

//   if (isFound === false) {
//     res.status(403)
//     res.send ({
//       message : "product not found"
//     })
//   } else {
//     products.splice(isFound, 1)
    
//     res.send({
//       message : "product is deleted"
//     })
//   }
// })




app.delete('/product/:id', (req, res)=> {

  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;      
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message : "product not found"
    })    
  } else {
    products.splice(isFound, 1)
    res.send({
      message : "product is deleted"
    })
  }
});
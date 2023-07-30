import express from "express";
import cors from "cors";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 20);
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGODB_USERNAME);

const mongodbURI = `mongodb+srv://attaulhasnain:Hasnain1881@cluster0.j7fos14.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongodbURI);
const database = client.db("ecom");
const productsCollection = database.collection("products");

const app = express();
app.use(cors());
app.use(express.json()); /// data ko json me convert krta h
// let products=[];

app.get("/checkAllProducts", async (req, res) => {
 const cur = productsCollection.find({});
 const allvalues = await cur.toArray(); /// keyword "find" in mongo db docs
 res.send({
  message: "all products",
  data: allvalues,
 });
});

app.get("/product/:id", async (req, res) => {
 const cur = await productsCollection.findOne({
  _id: new ObjectId(req.params.id),
 });
 res.send({
  message: "product found with id",
  data: cur,
 });
});
//console.log(typeof req.params.id)

// if (isNaN(req.params.id)) {                      /// for validation
//   res.status(403).send("invalid product id")
// }

// let isFound = false;
// for (let i = 0; i < products.length; i++) {         //// i = index ( array me product ka number )
//   if (products[i].id === req.params.id) {
//     isFound = i;
//     break;
//   }
// }

//   if (isFound === false) {
//     res.status(404);
//     res.send({
//       message: "product not found"
//     })
//   } else {
//     res.send({
//       message: "product found with id: " + products [isFound].id,
//       data: products[isFound]
//     });
//   }
// });

////  post request ////

app.post("/", async (req, res) => {
 if (!req.body.name || !req.body.price || !req.body.description) {
  res.status(403)
   .send(`required parameter missing. example JSON request body : {
      name : "abc product",
      price : "123$",
      description : "abc product description"
    }`);
  return;
 }

 const { name } = req.body.name;
 const { price } = req.body.price;
 const { description } = req.body.description;

 // console.log(testing);
 // res.send ("validation pass")
 // return;

 // products.push({
 //   id : nanoid(),
 //   name : req.body.name,
 //   price : req.body.price,
 //   description : req.body.description
 // })

 await productsCollection
  .insertOne({
   name: req.body.name,
   price: req.body.price,
   description: req.body.description,
  })
  .then(() => {
   res.status(201).send({ message: "created product" });
  })
  .catch(() => {
   res.status(500).send({
    message: "internal server error",
   });
  });
});

////  put request ////

app.put("/product/:id", async (req, res) => {
 if (!req.body.name && !req.body.price && !req.body.description) {
  res.status(403).send(`required parameter missing. 
      atleast one parameter is required: name, price or description to complete update 
      example JSON request body
      {
        name : "abc product",
        price : "123$",
        description : "abc product description"
      }`);
  return;
 }

 //  const { name } = req.body.name;
 //  const { price } = req.body.price;
 //  const { description } = req.body.description;

 // let isFound = false;

 // for (let i = 0; i < products.length; i++) {
 //   if (products[i].id === req.params.id) {
 //     isFound = i;
 //     break;
 //   }
 // }

 // if (isFound === false) {
 //   res.status(404);
 //   res.send({
 //     message : "product not found",

 //   });
 // } else {

 //   if (req.body.name) products[isFound].name = req.body.name
 //   if (req.body.price) products[isFound].price = req.body.price
 //   if (req.body.description) products[isFound].description = req.body.description

 await productsCollection
  .updateOne(
   { _id: new ObjectId(req.params.id) },
   {
    $set: {
     name: req.body.name,
     price: req.body.price,
     description: req.body.description,
    },
   }
  )
  .then(() => {
   res.send({ message: "product is updated:" });
  })
  .catch(() => {
   res.status(500).send({
    message: "internal server error",
   });
  });
});

////  delete request ////

app.delete("/product/:id", async (req, res) => {

 //  let isFound = false;

 //  for (let i = 0; i < products.length; i++) {
 //   if (products[i].id === req.params.id) {
 //    isFound = i;
 //    break;
 //   }
 //  }
 await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) 
  }).then(() => {
   res.send({
    message: "product is deleted",
   });
   res.status(404);
  }).catch(() => {
   res.send({
    message: "product not found",
   });
  });
});
//  if (isFound === false) {
//  } else {
//   products.splice(isFound, 1);
// }

const port = process.env.port || 3000;
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});

// console.log("testing nanoid" + " " + nanoid());

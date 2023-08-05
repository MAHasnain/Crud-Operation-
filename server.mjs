import express from "express";
import cors from "cors";
// import { customAlphabet } from "nanoid";
// const nanoid = customAlphabet("1234567890", 20);
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
console.log(process.env.MONGODB_USERNAME);

const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.j7fos14.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongodbURI);
const database = client.db("ecom");
const productsCollection = database.collection("products");

const app = express();
app.use(cors());
app.use(express.json()); /// data ko json me convert krta h
app.use (morgan("combined"));

app.get("/products", async (req, res) => {
 const cur = productsCollection.find({});

 try {
   const allvalues = await cur.toArray(); /// keyword "find" in mongo db docs
   res.send({
     message: "all products",
     data: allvalues,
    });
   } catch (error) {
    res.status(500).send({
     message: "internal server error",
    });
   }
});


////  get request (any 1 product) ///
app.get("/product/:id", async (req, res) => {
 if (!ObjectId.isValid(req.params.id)) {
  res.status(403).send({ message: "incorrect product id" });
  return;
 }

 try {
  const productData = await productsCollection.findOne({
   _id: new ObjectId(req.params.id),
  });
  res.send({
   message: "product found",
   data: productData,
  });
 } catch (error) {
  console.log("error", error);
  res.status(500).send({ message: "failed to get product, please try later" });
 }
});

// let students = () => {
//   console.log("hello");
// }

////  post request ////

app.post("/product", async (req, res) => {
 if (!req?.body?.name || !req?.body?.price || !req?.body?.description) {
  res.status(403)
   .send(`required parameter missing. example JSON request body : {
      name : "abc product",
      price : "123$",
      description : "abc product description"
    }`);
  return;
 }

 try {
   const result = await productsCollection.insertOne({
     name: req?.body?.name,
     price: req?.body?.price,
     description: req?.body?.description,
    })
    res.status(201).send({ message: "created product", data: result });
  } catch (error) {
   res.status(500).send({
    message: "failed to add please try later"
   });
  }
});

////  put request ////

app.put("/product/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)){
   res.status(404).send({ message: "incorrect product id" });
   return;
  }
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
 
 let product = {}
 
 if (req.body.name) req.body.name = req.body.name
 if (req.body.price) req.body.price = req.body.price
 if (req.body.description) req.body.description = req.body.description
 
try{
 const productdata = await productsCollection.updateOne(
   { _id: new ObjectId(req.params.id) },
   {$set: product}
  )
  console.log("product updated ", productdata);
   res.send({ message: "product updated successfully" });
  }
  catch {
    console.log("error", error);
   res.status(500).send({message: "internal server error",
   });
  }
});

////  delete request ////

app.delete("/product/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)){
    res.status(403).send({message : "incorrect product id"})
    return;
  }
try {
  const productdata = await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) }); 
  console.log("product deleted successfully", productdata);

    res.send({
      message: "product deleted successfully"
    });
  }catch (error) {
    console.log("error", error);
    res.status(500).send({message: "failed to delete product, please try later"})
  }
});

const port = process.env.port || 3000;
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});

// console.log("testing nanoid" + " " + nanoid());

import { MongoClient } from "mongodb"
import express from "express"
import cors from "cors"
import 'dotenv/config'

const PORT = process.env.PORT 

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.Mongo_URI)
client.connect()
const db = client.db('DinoHunters')
const dinosaurs = db.collection('dinosaurs')

// Get all dinosaurs on Main Home Page
app.get('/', async (req, res) => {
const allDinosaurs = await dinosaurs.find().toArray()
res.send(allDinosaurs)
})
// List all dinosaurs by category ??
app.get('/dinosaurPage', async (req, res) => {
  const dinosaurList = await dinosaurs.find().toArray()
  res.send(dinosaurList)
})
// Add a dinosaur to list
app.post('/addDinosaur', async (req, res) => {
  const addOneDinosaur = await dinosaurs.insertOne({name: req.body.name, location: req.body.location, type: req.body.type, description: req.body.description})
  res.status(201).send(addOneDinosaur)
})




app.listen(PORT, () = {
console.log(`Listening to API on ${PORT}`)
})
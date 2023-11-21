import { MongoClient } from "mongodb"
import express from "express"
import cors from "cors"

const PORT = 8080

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.Mongo_URI)
client.connect()
const db = client.db('DinoHunters')
const dinosaurs = db.collection('dinosaurs')

// List all dinosaurs by enviroment
app.get('/dinosaurPage/{environment}', async (req, res) => {
  const environment = req.params.environment
  const dinosaurList = await dinosaurs.find({environment: environment}).toArray()
  res.send(dinosaurList)
});

// Add a dinosaur to list
app.post('/addDinosaur', async (req, res) => {
  const addOneDinosaur = await dinosaurs.insertOne({name: req.body.name, environment: req.body.environment, diet: req.body.diet, description: req.body.description})
  res.status(201).send(addOneDinosaur)
});


app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
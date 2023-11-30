import express from "express"
import cors from "cors"

import { db } from "./src/connectDB.js"

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())

const dinosaurs = db.collection('dinosaurs')

// List all dinosaurs by enviroment
app.get('/dinosaurs/:environment', async (req, res) => {
  const environment = req.params.environment
  const dinosaurList = await dinosaurs.find({environment: environment}).toArray()
  res.send(dinosaurList)
});

// Add a dinosaur to list
app.post('/dinosaurs', async (req, res) => {
  const addOneDinosaur = await dinosaurs.insertOne({name: req.body.name, environment: req.body.environment, diet: req.body.diet, description: req.body.description})
  res.status(201).send(addOneDinosaur)
});

app.listen(PORT, () => {
console.log (`Listening on ${PORT}...`)
})
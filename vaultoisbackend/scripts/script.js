import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3003;

dotenv.config();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    // credentials: true  // Allow cookies and headers to be sent with requests
  })
);

const URL = process.env.MONGODB_URL;

const dbName = "passop";
const client = new MongoClient(URL);

await client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName);
const collection = db.collection("passwords");

app.get("/passwords", async (req, res) => {
  try {
    const result = await collection.find().toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

app.get("/passwords/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await collection.findOne({ id: id });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch password" });
  }
});

app.post("/save-password", async (req, res) => {
  try {
    console.log("Inside savePassword()");
    const password = req.body;
    const result = await collection.insertOne(password);
    console.log("Password saved successfully");
    res.json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save password" });
  }
});

app.post("/save-passwords", async (req, res) => {
  try {
    console.log("Inside savePasswords()");
    const passwords = req.body;
    const result = await collection.insertMany(passwords);
    console.log("Passwords saved successfully");
    res.json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save passwords" });
  }
});

app.put("/passwords/:id", async (req, res) => {
  try {
    console.log("Inside updatePassword()");
    const id = req.params.id;
    const updateData = req.body;
    delete updateData._id; // Remove _id field if present
    const result = await collection.updateOne({ id: id }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    console.log("Password updated successfully");
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

app.delete("/passwords/:id", async (req, res) => {
  try {
    console.log("Inside deletePassword()");
    const id = req.params.id;
    const result = await collection.deleteOne({ id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    console.log("Password deleted successfully");
    res.json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete password" });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

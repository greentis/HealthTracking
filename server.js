console.log("running server.js");

const express = require("express");
const mongoose = require("mongoose"); // Add mongoose for MongoDB connection
const foodNutritionModel = require("./models/foodNutritionModel");

const app = express();  

// MongoDB connection
const dbPassword = "sunlightBringsFortune"; // Replace with actual password
const dbURI = `mongodb+srv://admin:${dbPassword}@healthdata.wyxsv.mongodb.net/HealthTrackerAPI?retryWrites=true&w=majority&appName=healthData`;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static('src'));
//mongoose.set("strictQuery",false);
mongoose.connect(dbURI)
    .then(
        () => {
            console.log("Connected to MoongoDB");

            

            app.listen(3000, () => {
                console.log("Welcome to health tracker!")
            });

            
        })
    .catch(err => console.log(err));

// routes

// Read
app.get('/', (req, res) => {
    res.send("Welcome to health tracker!");
});

app.get('/food', async (req, res) => {
    try {
        const products = await foodNutritionModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/food/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const products = await foodNutritionModel.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create
app.post('/food', async (req, res) => {
    try {
        const food = await foodNutritionModel.create(req.body);
        res.status(201).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    console.log("Request received");
});

// Update
app.put('/food/:id', async(req, res) => {
    try {
        const {id} = req.params;

        //
        // This returns the food before updating
        //
        await foodNutritionModel.findByIdAndUpdate(id, req.body);

        const food = await foodNutritionModel.findById(id);
        if (food){
            res.status(201).json(food);
        } else {
            return res.status(404).json({message: `Food with id ${id} not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Delete
app.delete('/food/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const food = await foodNutritionModel.findByIdAndDelete(id);
        if (food){
            res.status(200).json(food);
        } else {
            res.status(404).json({message: `Food with id ${id} not found`});
        }
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
});



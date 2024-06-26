const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/articles.js");
const Article1 = require("./models/article1.js"); 
app.use(express.json());

mongoose.connect("mongodb+srv://sara:sara123@firstdatabases.hiellyx.mongodb.net/all-data?retryWrites=true&w=majority&appName=firstdatabases")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    })
    .catch((error) => { // Fixed typo here
        console.error("Error connecting to MongoDB:", error);
    });

app.get("/", (req, res) => {
    res.send("hello");
    const ip = 
        req.headers['cf-connecting-ip'] ||  
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
    return res.json({ip}); // Fixed request and response object names
});

app.get("/hi", (req, res) => {
    res.sendFile(__dirname + "/views/nimm.html");
});

app.post("/articles", async (req, res) => {
    try {
        const newArticle = new Article();
        newArticle.altitude = "haha";
        newArticle.location = "hollo";
        await newArticle.save();
        res.send("Article sent");
    } catch (error) {
        console.error("Error saving article:", error);
        res.status(500).send("Error saving article");
    }
});

// Endpoint to receive data from Arduino and store in MongoDB
app.post('/data', async (req, res) => {
    try {
        const { sensorData1, sensorData2, sensorData3, sensorData4, sensorData5, sensorData6, sensorData7, sensorData8, sensorData9, sensorData10 } = req.body;
        console.log('Received data from Arduino:');
        console.log('Sensor Data 1:', sensorData1);
        console.log('Sensor Data 2:', sensorData2);
        console.log('Sensor Data 3:', sensorData3);
        console.log('Sensor Data 4:', sensorData4);
        console.log('Sensor Data 5:', sensorData5); 
        console.log('Sensor Data 6:', sensorData6);
        console.log('Sensor Data 7:', sensorData7);
        console.log('Sensor Data 8:', sensorData8);
        console.log('Sensor Data 9:', sensorData9);
        console.log('Sensor Data 10:', sensorData10);

        // Create a new document using the sensor data
        const newSensorData = new Article1({ 
            Time: sensorData1,
            Date: sensorData2,
            Fix: sensorData3,
            Satellites: sensorData4,
            quality: sensorData5,
            Location: sensorData6,
            GoogleMapslocation: sensorData7,
            Speed: sensorData8,
            Heading: sensorData9,
            Altitude: sensorData10
        });
        
        // Save the sensor data to MongoDB
        await newSensorData.save();

        console.log('Data inserted successfully');
        res.status(200).send('Data received and stored in MongoDB');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Internal Server Error'); 
    }
});








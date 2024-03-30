app.post('/inf', (req, res) => {
    const ata  = req.body;
    collection.insertOne(ata , (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data inserted successfully');
        res.status(200).send('Data received');
      }
    });
  });
  //Define the MongoDB collection based on the Article model
const ArticleModel = mongoose.model("Article");
const collection = mongoose.model("Article");
  app.post('/inf1', (req, res) => {
    // Assuming the Arduino sends JSON data like { "sensorData": yourData }
    const val = req.body.val;
    const vall = req.body.vall;

    // Create an object with the fields extracted from the request body
    const data = {
        val: val,
        vall: vall
    };
    // Insert data into MongoDB
    
    ArticleModel.create(data)
        .then(() => {
            console.log('Data inserted successfully');
            res.status(200).send('Data received');
        })
        .catch(err => {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal Server Error');
        })
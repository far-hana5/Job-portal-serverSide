const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//2J5I3ft6JUhztMkR
//JobHunter
app.use(cors());
app.use(express.json());


//const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.a420l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.a420l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //jobs related apis
        const jobsCollection = client.db('jobPortal').collection('Jobs');
        app.get('/jobs', async (req, res) => {
            const cursor = jobsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        /*
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await jobsCollection.findOne(query);
            res.send(result);
        });*/
        const { ObjectId } = require('mongodb');

app.get('/jobs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const job = await jobsCollection.findOne({ _id: new ObjectId(id) }); // ✅ Fix
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.send(job);
  } catch (err) {
    res.status(400).send({ error: 'Invalid ID format' });
  }
});


    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Job is falling from the sky')
})
app.listen(port, () => {
    console.log(`Job is waiting at: ${port}`)
})
/*


*/
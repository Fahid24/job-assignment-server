const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o5rbgi7.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        await client.connect();
        const tasksCollection = client.db('daily-tasks').collection('panding');





        app.post('/panding', async (req, res) => {
            const panding = req.body;
            const result = await tasksCollection.insertOne(panding);
            res.send(result)
        })
        app.get('/panding', async (req, res) => {
            const query = {};
            const cursor = tasksCollection.find(query);
            const panding = await cursor.toArray();
            res.send(panding)
        })



    }
    finally {

    }

}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('daily-tasks World!')
})

app.listen(port, () => {
    console.log(`tasks app listening on port ${port}`)
})
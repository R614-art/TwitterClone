const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
}
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.akev1zu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");


        const postCollection = client.db('database').collection('posts');
        const userCollection = client.db('database').collection('users');

        app.get('/post',async(req,res)=>{
            const posts=(await postCollection.find().toArray()).reverse();
            res.send(posts);
        })
        app.get('/user',async(req,res)=>{
            const users=await userCollection.find().toArray();
            res.send(users);
        })

        app.get('/loggedinuser',async(req,res)=>{
            const email = req.query.email;
            const user= await userCollection.findOne({email:email});
            res.send(user);
        })

        app.get('/userPost',async(req,res)=>{
            const email = req.query.email;
            const posts= (await postCollection.find({email:email}).toArray()).reverse();
            res.send(posts);
        })

        app.post('/post', async (req, res) => {
            //console.log('POST request received');
            const post = req.body;
            //console.log('Post data:', post);

            try {
                const result = await postCollection.insertOne(post);
                //console.log('Database insert result:', result);
                res.status(201).send(result);
            } catch (error) {
                console.error('Error inserting post:', error);
                res.status(500).send({ message: 'Error inserting post', error });
            }
        });
        
        app.post('/register', async (req, res) => {
            //console.log('POST request received');
            const user = req.body;
            //console.log('Post data:', post);

            try {
                const result = await userCollection.insertOne(user);
                //console.log('Database insert result:', result);
                res.status(201).send(result);
            } catch (error) {
                console.error('Error inserting post:', error);
                res.status(500).send({ message: 'Error inserting post', error });
            }
        });

        app.patch('/userUpdates/:email',async (req,res)=>{
            const filter= req.params;
            const profile=req.body;
            const options={ upsert:true };
            const updateDoc = { $set : profile};
            const result=await userCollection.updateOne(filter,updateDoc,options);
            res.send(result);
        })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

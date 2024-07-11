require('dotenv').config({ path: "./.env" });
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const uri = process.env.ENV_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const store = new MongoDBStore({
  uri: uri,
  collection: 'sessions'
});

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(session({
  secret: 'your_secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('student-management');
    const usersCollection = database.collection('users');
    const catalogCollection = database.collection('catalog');

    // Middleware to check if user is authenticated
    const isAuthenticated = (req, res, next) => {
      const authToken = req.headers.authToken;
      const user = usersCollection.findOne({ authToken });
      if (user && user.authToken === authToken) {
        return next();
      }
      res.status(401).send('Unauthorized');
    };

    // Total no of students for home page
    app.get('/totalStudents', async (req, res) => {
      try {
        const totalStudents = await usersCollection.countDocuments();
        res.send({ totalStudents });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User registration
    app.post('/register', async (req, res) => {
      try {
        const { email, id, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const authToken = crypto.randomBytes(64).toString('hex');

        const result = await usersCollection.insertOne({ username:email, studentId:id, password: hashedPassword, authToken });
        if (result.insertedCount === 0){ 
          return res.status(400).send({message: 'User registration failed'});
        } else {
            // filtering out the password from the user object
          usertobesent = await usersCollection.findOne({ username:email });
          delete usertobesent.password;
          return res.status(201).send({message: 'User registered successfully', user: usertobesent});
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User login
    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ username:email });
        if (!user) return res.status(404).send({message:"User not found"});
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).send({message:'Invalid password'});

        const authToken = crypto.randomBytes(64).toString('hex');
        await usersCollection.updateOne({ username:email }, { $set: { authToken} });
        // filtering out the password from the user object
        usertobesent = user;
        delete usertobesent.password;

        res.send({message: 'Logged in successfully', user: usertobesent});
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User logout
    app.post('/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) return res.status(500).send('Could not log out.');
        res.send('Logged out successfully');
      });
    });

    // CRUD operations for students, protected by authentication
    app.post('/students', isAuthenticated, async (req, res) => {
      try {
        const student = req.body;
        const result = await usersCollection.insertOne(student);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/students', isAuthenticated, async (req, res) => {
      try {
        const students = await usersCollection.find().toArray();
        res.send(students);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/catalog', isAuthenticated, async (req, res) => {
      try {
        const catalog = await catalogCollection;
        res.send(catalog);
      } catch (error) {
        console.log("error", error)
        res.status(500).send(error.message);
      }
    });

    app.get('/students/:id', isAuthenticated, async (req, res) => {
      try {
        const student = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!student) return res.status(404).send('Student not found');
        res.send(student);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.put('/students/:studentId', isAuthenticated, async (req, res) => {
      try {
        const updatedStudent = req.body;
        const result = await usersCollection.updateOne(
          { studentId: (req.params.studentId) },
          { $set: updatedStudent }
        );
        if (result.matchedCount === 0) return res.status(404).send('Student not found');
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.delete('/students/:id', isAuthenticated, async (req, res) => {
      try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send('Student not found');
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/username', (req, res) => {
      const username = req.session.username || null;
      res.json({ username });
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

run().catch(console.dir);

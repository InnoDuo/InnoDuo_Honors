const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
const cors = require('cors');
<<<<<<< HEAD

const uri = "mongodb+srv://nathantayele:XNCZOuzODnTPfZ1z@cluster0.0lutihh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
=======
const uri = "mongodb+srv://nathantayele:XNCZOuzODnTPfZ1z@cluster0.0lutihh.mongodb.net/student-management?retryWrites=true&w=majority&appName=Cluster0";
>>>>>>> c7142617d7425b2517f4d7e35493e5a6ef116b1d

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
    const studentsCollection = database.collection('students');

    // Middleware to check if user is authenticated
    const isAuthenticated = (req, res, next) => {
      if (req.session.userId) {
        return next();
      }
      res.status(401).send('Unauthorized');
    };

    // Total no of students for home page
    app.get('/totalStudents', async (req, res) => {
      try {
        const totalStudents = await studentsCollection.countDocuments();
        res.send({ totalStudents });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User registration
    app.post('/register', async (req, res) => {
      try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({ username, password: hashedPassword });
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User login
    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });
        if (!user) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).send('Invalid password');

        req.session.userId = user._id;
        req.session.username = user.username;
        res.send('Logged in successfully');
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
        const result = await studentsCollection.insertOne(student);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/students', isAuthenticated, async (req, res) => {
      try {
        const students = await studentsCollection.find().toArray();
        res.send(students);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/students/:id', isAuthenticated, async (req, res) => {
      try {
        const student = await studentsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!student) return res.status(404).send('Student not found');
        res.send(student);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.put('/students/:id', isAuthenticated, async (req, res) => {
      try {
        const updatedStudent = req.body;
        const result = await studentsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
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
        const result = await studentsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
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
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

run().catch(console.dir);

require('dotenv').config({ path: "./.env" });
const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const http = require('http');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
// const studentProfile = require('./sampleProfile');
const uri = process.env.ENV_URI;



// just a sample 
// const studentProfile = {
//   _id: "668b1fb6ae08c03994df4bb9",
//   username: "anujkhadka",
//   studentId: "445623",
//   password: "$2b$10$GPT0szc.kRvm22pCHzXDL.K2/kpFk9YwaIugCRw32/z8XrOCHhmTu",
//   authToken:
//     "c132572ce0675459ec133307d39c858ff12a40139101dbceabd751dcc581a0c42e4790…",
//   major: "Computer Science",
//   gradYear: "2027",
//   advisor: "Lee Ho",
//   firstName: "Anuj",
//   lastName: "Khadka",
//   classification: "Sophomore",
//   phoneNo: "9876543209",
// };



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


const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

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
        usertobesent.authToken = authToken;
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
        const catalog = await catalogCollection.find().toArray();
        res.send(catalog[0]);
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


    // for real time student profile 
    app.post('/updateProfile', (req, res) => {
      userProfile = { ...req.body };
      // io.emit('profile updated', userProfile);
      console.log(userProfile)
      res.status(200).json({ message: 'profile updated successfully', userProfile });
    });


    io.on('connection', (socket) => {
      console.log('user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
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

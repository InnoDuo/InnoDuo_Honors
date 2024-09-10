require("dotenv").config({ path: "./.env" });
const express = require("express");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const http = require("http");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
// const studentProfile = require('./sampleProfile');
const uri = process.env.ENV_URI;

const Student = require("./models/student");
const courseSchema = require("./models/course");

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
  },
});

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(
  session({
    secret: "your_secret_key", // Replace with your own secret
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const { ObjectId } = require('mongodb');
    const database = client.db("student-management");
    const usersCollection = database.collection("users");
    const catalogCollection = database.collection("catalog");

    // Middleware to check if user is authenticated
    const isAuthenticated = (req, res, next) => {
      const authToken = req.headers.authToken;
      const user = usersCollection.findOne({ authToken });
      if (user && user.authToken === authToken) {
        return next();
      }
      res.status(401).send("Unauthorized");
    };

    // Total no of students for home page
    app.get("/totalStudents", async (req, res) => {
      try {
        const totalStudents = await usersCollection.countDocuments();
        res.send({ totalStudents });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User registration
    app.post("/register", async (req, res) => {
      try {
        const { email, id, password, role, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const authToken = crypto.randomBytes(64).toString("hex");

        const result = await usersCollection.insertOne({
          username: email,
          studentId: id,
          password: hashedPassword,
          authToken,
          role,
          firstName,
          lastName,
        });
        if (result.insertedCount === 0) {
          return res.status(400).send({ message: "User registration failed" });
        } else {
          // filtering out the password from the user object
          usertobesent = await usersCollection.findOne({ username: email });
          delete usertobesent.password;
          return res
            .status(201)
            .send({
              message: "User registered successfully",
              user: usertobesent,
            });
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User login
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await usersCollection.findOne({
          username: email,
        });
        if (!user) return res.status(404).send({ message: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
          return res.status(403).send({ message: "Invalid password" });

        const authToken = crypto.randomBytes(64).toString("hex");
        await usersCollection.updateOne(
          { username: email },
          { $set: { authToken } }
        );

        // filtering out the password from the user object
        usertobesent = user;
        usertobesent.authToken = authToken;
        delete usertobesent.password;

        res.send({ message: "Logged in successfully", user: usertobesent });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // User logout
    app.post("/logout", (req, res) => {
      req.session.destroy((err) => {
        if (err) return res.status(500).send("Could not log out.");
        res.send("Logged out successfully");
      });
    });

    // CRUD operations for students, protected by authentication
    app.post("/students", isAuthenticated, async (req, res) => {
      try {
        const student = req.body;
        const result = await usersCollection.insertOne(student);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get("/students", isAuthenticated, async (req, res) => {
      try {
        const students = await usersCollection.find().toArray();
        res.send(students);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get("/catalog", isAuthenticated, async (req, res) => {
      try {
        const catalog = await catalogCollection.find().toArray();
        res.send(catalog[0]);
      } catch (error) {
        console.log("error", error);
        res.status(500).send(error.message);
      }
    });

    app.get('/getCourses', isAuthenticated, async (req, res) => {
      try {
        // Fetch all courses. Adjust projection as needed based on your schema.
        const courses = await catalogCollection.aggregate([
          { $match: { _id: new ObjectId("6697300758ff41efb445cb50") } }, // Ensure you are querying the correct document
          { $project: { classes: { $objectToArray: "$classes" } } },
          { $unwind: "$classes" },
          { $unwind: "$classes.v" },
          { $replaceRoot: { newRoot: "$classes.v" } },
          { $project: { _id: 0, courseCode: 1, courseName: 1 } } // Adjust the projection as needed
        ]).toArray();

        if (courses.length === 0) {
          return res.status(404).json({ message: 'No courses found' });
        }

        res.json({ courses });
      } catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ message: 'Failed to retrieve courses' });
      }
    });

    app.get("/students/:id", isAuthenticated, async (req, res) => {
      try {
        const student = await usersCollection.findOne({
          _id: new ObjectId(req.params.id),
        });
        if (!student) return res.status(404).send("Student not found");
        res.send(student);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.put("/students/:studentId", isAuthenticated, async (req, res) => {
      try {
        const updatedStudent = req.body;
        const result = await usersCollection.updateOne(
          { studentId: req.params.studentId },
          { $set: updatedStudent }
        );
        if (result.matchedCount === 0)
          return res.status(404).send("Student not found");
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.delete("/students/:id", isAuthenticated, async (req, res) => {
      try {
        const result = await usersCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        if (result.deletedCount === 0)
          return res.status(404).json({ message: "Student not found." });
        res.send({ message: "Student deleted successfully" });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get("/username", (req, res) => {
      const username = req.session.username || null;
      res.json({ username });
    });

    // for real time student profile
    app.post("/updateProfile", async (req, res) => {
      try {
        const {
          studentId,
          firstName,
          lastName,
          username,
          advisor,
          gradYear,
          major,
          phoneNo,
        } = req.body;

        console.log(studentId);

        const user = await usersCollection.findOne({ studentId: studentId });

        if (user) {
          await usersCollection.updateOne(
            { studentId: studentId },
            {
              $set: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                advisor: advisor,
                gradYear: gradYear,
                major: major,
                phoneNo: phoneNo,
              },
            }
          );
          const newUser = await usersCollection.findOne({
            studentId: studentId,
          });

          res
            .status(200)
            .json({
              message: "profile updated successfully",
              newUser: newUser,
            });
          // sessionStorage.setItem("user", JSON.stringify(user));
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "error updating profile" });
      }
    });

    io.on("connection", (socket) => {
      console.log("user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    app.post("/addstudent", async (req, res) => {
      try {
        const {
          id,
          firstName,
          lastName,
          email,
          username,
          advisor,
          gradYear,
          major,
          phoneNo,
        } = req.body;
        const newStudent = new Student({
          firstName,
          lastName,
          studentId: id,
          email,
          phoneNo,
          major,
          advisor,
          gradYear,
          username,
        });

        if (!id || !firstName || !lastName || !email || !advisor || !gradYear || !major || !phoneNo) {
          return res.status(400).json({ message: "All fields are required" });
        }

        await usersCollection.insertOne(newStudent);
        res.json({ message: "Added successfully" });
        console.log("added");
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error during adding" });
      }
    });

    app.post("/addstudenttocourse", async (req, res) => {
      const { courseCode, semester, section, studentId } = req.body;

      try {
        const updateResult = await catalogCollection.updateOne(
          {
            [`classes.$[].${courseCode}.semesters.${semester}.${section}`]: {
              $exists: true,
            },
          },
          {
            $addToSet: {
              [`classes.$[].${courseCode}.semesters.${semester}.${section}.students`]:
                studentId,
            },
          }
        );

        if (updateResult.nModified === 0) {
          return res
            .status(404)
            .json({ message: "Course, semester, or section not found" });
        }

        res
          .status(200)
          .json({ message: "Student added to course successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.post("/addcourse", async (req, res) => {
      try {
        const { courseCode, courseName, courseCategory, semesters, courseDescription, courseCredit, maxStudents } = req.body;

        const newCourse = {
          courseCode,
          courseName,
          semesters,
          courseDescription,
          courseCredit,
          maxStudents
        };

        const updateResult = await catalogCollection.updateOne(
          { "_id": new ObjectId("6697300758ff41efb445cb50") }, // Use 'new' keyword to correctly create an ObjectId instance
          { $push: { [`classes.${courseCategory}`]: newCourse } } // Use the $push operator to add the new course to the array
        );

        if (updateResult.modifiedCount === 1) {
          console.log("Course added successfully");
          res.json({ message: "Course added successfully" });
        } else {
          throw new Error("No document found or nothing was updated.");
        }
      } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ message: "Error adding course" });
      }
    });

    app.post("/addsection", async (req, res) => {
      try {
        const { courseId, semester, sectionId, instructor, duration, period, location, students } = req.body;
        const categories = ["CRACAD", "Cores", "Events", "Freshman", "Research", "Seminars", "Freshman Seminar"]; // Example categories

        console.log([
          courseId, semester, sectionId, instructor, duration, period, location, students
        ]);
        let updateResult;
        for (let category of categories) {
          const sectionPath = `classes.${category}.$[course].semesters.${semester}.${sectionId}`;
          updateResult = await catalogCollection.updateOne(
            {
              "_id": new ObjectId("6697300758ff41efb445cb50"),
              [`classes.${category}.courseCode`]: courseId
            },
            {
              $set: { [sectionPath]: { instructor, duration, period, location, students, isComplete: false } }
            },
            {
              arrayFilters: [{ "course.courseCode": courseId }]
            }
          );

          if (updateResult.modifiedCount > 0) {
            break; // Stop if the update was successful
          }
        }

        if (!updateResult || updateResult.modifiedCount === 0) {
          res.status(404).json({ message: "Course not found or no changes made." });
        } else {
          res.json({ message: "Section added successfully" });
          console.log("Section added successfully");
        }
      } catch (error) {
        console.error("Error during adding section:", error);
        res.status(500).json({ message: "Error during adding section" });
      }
    });




    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

run().catch(console.dir);

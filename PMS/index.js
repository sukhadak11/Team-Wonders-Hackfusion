const express = require('express');
const path = require('path');
const collection = require('./config');
const User = require('./usermodel'); // Import the User model
const nodeMailer = require('nodemailer');
const bcrypt = require('bcrypt');


const app = express();

const tempelatePath = path.join(__dirname, "../views");
const staticPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
        const newUser = new User({
            name: req.body.name,
            phoneno: req.body.phoneno,
            email: req.body.email,
            password: hashedPassword, // Store hashed password
            filename: req.body.filename
        });
        await newUser.save(); // Save user to database
        res.redirect("/login"); // Redirect to login page
    } catch (error) {
        console.error(error);
        res.render("error", { message: "Error signing up" }); // Render error page
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password); // Compare hashed passwords
            if (match) {
                console.log("Redirecting to index page");
                res.redirect("/index"); // Redirect to index page upon successful login
            } else {
                res.render("login", { error: "Invalid username or password" });
            }
        } else {
            res.render("login", { error: "Invalid username or password" });
        }
    } catch (error) {
        console.error(error);
        res.render("error", { message: "Error logging in" }); // Render error page
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

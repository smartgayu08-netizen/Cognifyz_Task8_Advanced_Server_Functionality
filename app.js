const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

/* Middleware & Request Logging */
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`);
    next();
});

/* Server-side Cache */
let cache = {};

/* Home Page */
app.get("/", (req, res) => {
    res.render("index");
});

/* Cache Demo Route */
app.get("/data", (req, res) => {

    let message = "";

    if (cache.message) {
        message = "Loaded from Cache: " + cache.message;
    } else {
        cache.message = "Server Data Loaded Successfully";
        message = "Fetched from Source: " + cache.message;
    }

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cache Result</title>

        <style>
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial,sans-serif;
            }

            body{
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:linear-gradient(to right,#667eea,#764ba2);
            }

            .card{
                background:white;
                padding:40px;
                border-radius:15px;
                text-align:center;
                box-shadow:0 4px 15px rgba(0,0,0,0.2);
                width:500px;
            }

            h2{
                color:#2c3e50;
                margin-bottom:20px;
            }

            p{
                font-size:18px;
                margin-bottom:20px;
            }

            button{
                padding:12px 20px;
                border:none;
                border-radius:5px;
                background:#3498db;
                color:white;
                cursor:pointer;
                font-size:16px;
            }

            button:hover{
                background:#2980b9;
            }

            a{
                text-decoration:none;
            }
        </style>

    </head>

    <body>

        <div class="card">

            <h2>🚀 Cache Demonstration</h2>

            <p>${message}</p>

            <a href="/">
                <button>Back to Home</button>
            </a>

        </div>

    </body>
    </html>
    `);
});

/* Background Task */
setInterval(() => {
    console.log("Background Task Running...");
}, 30000);

/* Server */
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
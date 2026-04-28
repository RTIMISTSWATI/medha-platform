const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/execute", (req, res) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({
            status: "Error",
            message: "Language and code are required"
        });
    }

    if (language === "python") {
        fs.writeFileSync("temp.py", code);

        exec("python temp.py", (error, stdout, stderr) => {
            if (error) {
                return res.json({
                    status: "Runtime Error",
                    error: stderr
                });
            }

            return res.json({
                status: "Accepted",
                output: stdout
            });
        });
    }

    else {
        return res.status(400).json({
            status: "Error",
            message: "Only Python supported for now"
        });
    }
});

app.listen(5001, () => {
    console.log("Code Execution Engine running on port 5001");
});
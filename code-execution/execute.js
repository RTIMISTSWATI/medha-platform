const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/execute", (req, res) => {
    const { language, code, input, expectedOutput } = req.body;

    if (!language || !code) {
        return res.status(400).json({
            status: "Error",
            message: "Language and code are required"
        });
    }

    if (language === "python") {
        fs.writeFileSync("temp.py", code);

        exec(`echo "${input}" | python temp.py`, (error, stdout, stderr) => {
            if (error) {
                return res.json({
                    status: "Runtime Error",
                    error: stderr
                });
            }

            const userOutput = stdout.trim();
            const correctOutput = expectedOutput.trim();

            if (userOutput === correctOutput) {
                return res.json({
                    status: "Accepted",
                    output: userOutput
                });
            } else {
                return res.json({
                    status: "Wrong Answer",
                    expected: correctOutput,
                    received: userOutput
                });
            }
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
    console.log("Judge System running on port 5001");
});
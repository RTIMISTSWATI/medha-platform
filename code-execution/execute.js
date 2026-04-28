const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/execute", async (req, res) => {
    const { language, code, testCases } = req.body;

    if (!language || !code || !testCases) {
        return res.status(400).json({
            status: "Error",
            message: "Language, code, and testCases are required"
        });
    }

    if (language === "python") {
        // Save user code temporarily
        fs.writeFileSync("temp.py", code);

        for (let i = 0; i < testCases.length; i++) {
            const { input, expectedOutput } = testCases[i];

            // Save test case input into file (better than echo)
            fs.writeFileSync("input.txt", input);

            const result = await new Promise((resolve) => {
                exec(
                    `python temp.py < input.txt`,
                    (error, stdout, stderr) => {
                        if (error) {
                            resolve({
                                status: "Runtime Error",
                                error: stderr
                            });
                            return;
                        }

                        const userOutput = stdout.trim();
                        const correctOutput = expectedOutput.trim();

                        if (userOutput === correctOutput) {
                            resolve({
                                status: "Passed"
                            });
                        } else {
                            resolve({
                                status: "Wrong Answer",
                                expected: correctOutput,
                                received: userOutput,
                                failedCase: i + 1
                            });
                        }
                    }
                );
            });

            // Stop immediately if one test case fails
            if (result.status !== "Passed") {
                return res.json(result);
            }
        }

        // If all test cases pass
        return res.json({
            status: "Accepted",
            message: "All test cases passed"
        });
    }

    return res.status(400).json({
        status: "Error",
        message: "Only Python supported for now"
    });
});

app.listen(5001, () => {
    console.log("Judge System running on port 5001");
});
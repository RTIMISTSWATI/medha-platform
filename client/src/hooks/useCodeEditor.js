import { useState } from "react";
import { executeCode } from "../services/codeService";

const DEFAULT_CODE = {
  python: "# Write your Python code here\nprint('Hello, Medha!')\n",
};

export function useCodeEditor() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_CODE.python);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] ?? "");
    setOutput("");
    setIsError(false);
  };

  const runCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput("");
    setIsError(false);

    try {
      const result = await executeCode({ language, code, input: customInput });
      if (result.error) {
        setOutput(result.error);
        setIsError(true);
      } else {
        setOutput(result.output ?? "");
      }
    } catch (err) {
      setOutput(err.response?.data?.error || err.message || "Connection error — is the judge running?");
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  return {
    language, code, customInput, output, isError, isRunning,
    setCode, setCustomInput,
    handleLanguageChange, runCode,
  };
}

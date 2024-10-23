import { useState } from "react";
import "./App.css";
import { Heart, Lock } from "lucide-react";
import { generateStrongPassword } from "./utils/generatePassword";
import CopyTo from "./components/CopyTo/CopyTo";

function App() {
  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [isLowercase, setIsLowercase] = useState<boolean>(false);
  const [isNumPassword, setIsNumPassword] = useState<boolean>(false);
  const [isSymbol, setIsSymbol] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [generatePassword, setGeneratedPassword] = useState<string>("");

  // To handle Copy To Clipboard

  const handleCopy = (password: string): void => {
    navigator.clipboard.writeText(password);
    console.log("Copy to clip", password);
  };

  // To Handle the Range input
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value));
  };

  // To validate the form if only one checkbox is checked

  const validateForm = () => {
    return (
      passwordLength >= 10 &&
      (isLowercase || isNumPassword || isSymbol || isUppercase)
    );
  };

  // To show the level of difficulty when the user create the password
  const strengthPassword = () => {
    let strength = 0;
    if (passwordLength) strength += 1;
    if (isUppercase) strength += 1;
    if (isLowercase) strength += 1;
    if (isNumPassword) strength += 1;
    if (isSymbol) strength += 1;

    if (strength <= 1) return "Too Easy";
    if (strength === 2) return "Easy";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  // To handle the Submit input
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const generated = generateStrongPassword({
      length: passwordLength,
      uppercase: isUppercase,
      lowercase: isLowercase,
      number: isNumPassword,
      symbol: isSymbol,
    });
    setGeneratedPassword(generated);
    setIsGenerated(true);
  };

  return (
    <div className="main">
      <h1 className="main-h1">Password Generator</h1>

      {isGenerated && (
        <div className="container-password">
          <p>{generatePassword}</p>
          <CopyTo handleCopy={() => handleCopy(generatePassword)} />
        </div>
      )}

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label className="container-length">
            Length Password: {passwordLength}
            <input
              type="range"
              min="1"
              max="64"
              step="1"
              value={passwordLength}
              onChange={handleChangeInput}
            />
          </label>
          <label className="container-checkbox uppercase">
            <input
              type="checkbox"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
            />
            Include Uppercase Letters
          </label>
          <label className="container-checkbox lowercase">
            <input
              type="checkbox"
              checked={isLowercase}
              onChange={(e) => setIsLowercase(e.target.checked)}
            />
            Include Lowercase Letters
          </label>
          <label className="container-checkbox numbers">
            <input
              type="checkbox"
              checked={isNumPassword}
              onChange={(e) => setIsNumPassword(e.target.checked)}
            />
            Include Numbers
          </label>
          <label className="container-checkbox symbols">
            <input
              type="checkbox"
              checked={isSymbol}
              onChange={(e) => setIsSymbol(e.target.checked)}
            />
            Include Symbols
          </label>
          <div className="container-strength">
            <p>STRENGTH</p>
            <div className="container-difficulty">
              <p>{strengthPassword()}</p>
              <div className="container-heart">
                <Heart
                  size={15}
                  color="#fff"
                  fill={
                    strengthPassword() === "Easy" ||
                    strengthPassword() === "Medium" ||
                    strengthPassword() === "Strong"
                      ? "#e60012"
                      : ""
                  }
                />
                <Heart
                  size={15}
                  color="#fff"
                  fill={
                    strengthPassword() === "Medium" ||
                    strengthPassword() === "Strong"
                      ? "#e60012"
                      : ""
                  }
                />
                <Heart
                  size={15}
                  color="#fff"
                  fill={strengthPassword() === "Strong" ? "#e60012" : ""}
                />
              </div>
            </div>
          </div>
          <button disabled={!validateForm()} className="btn">
            GENERATE
            <Lock size={15} />
          </button>
          {passwordLength < 10 && (
            <p className="error-length">A short password is a bad password.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { Copy, Heart } from "lucide-react";
import { generateStrongPassword } from "./utils/generatePassword";

function App() {
  const [passwordLength, setPasswordLength] = useState<number>(1);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [isLowercase, setIsLowercase] = useState<boolean>(false);
  const [isNumPassword, setIsNumPassword] = useState<boolean>(false);
  const [isSymbol, setIsSymbol] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [generatePassword, setGeneratedPassword] = useState<string>("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value));
  };

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
    <div className="container">
      <h1>Password Generator</h1>
      {isGenerated && (
        <div className="container-password">
          <p>{generatePassword}</p>
          <Copy size={15} color="#fff" />
        </div>
      )}
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
        <button disabled={passwordLength < 10}>GENERATE</button>
        {passwordLength < 10 && (
          <p className="error-length">A short password is a bad password.</p>
        )}
      </form>
      <div className="container-strength">
        <p>STRENGTH</p>
        <div className="container-difficulty">
          <p>MEDIUM</p>
          <div className="container-heart">
            <Heart size={15} color="#fff" fill="#e60012" />
            <Heart size={15} color="#fff" fill="#e60012" />
            <Heart size={15} color="#fff" fill="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

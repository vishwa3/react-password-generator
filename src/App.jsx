import "./App.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/PasswordStrengthIndicator";
import Button from "./components/Button";
function App() {
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false, id: "1" },
    { title: "Include Lowercase Letters", state: false, id: "2" },
    { title: "Include Numbers", state: false, id: "3" },
    { title: "Include Symbols", state: false, id: "4" },
  ]);
  const [characterLength, setCharacterLength] = useState("4");
  const [copied, setCopied] = useState(false);
  const { errorMessage, password, generatePassword } = usePasswordGenerator();
  function handleCheckboxChange(e, id) {
    const updatedCheckboxData = checkboxData.map((item) => {
      if (item.id === id) {
        return { ...item, state: e.target.checked };
      }
      return item;
    });
    setCheckboxData(updatedCheckboxData);
  }
  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }
  return (
    <>
      <div className="container">
        {password && (
          <div className="generated_password">
            <p>{password}</p>

            <Button
              customClassName="copy_button"
              onClick={handleCopy}
              label={copied ? "COPIED" : "COPY"}
            />
          </div>
        )}
        <div className="character_length_container">
          <div className="character_length">
            <p>Character Length</p>
            <p>{characterLength}</p>
          </div>
          <div className="character_input">
            <input
              type="range"
              min="4"
              max="20"
              id="characteer_length"
              name="character_length"
              value={characterLength}
              onChange={(e) => setCharacterLength(e.target.value)}
            />
          </div>
          <div className="checkbox_container">
            {checkboxData.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "5px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.state}
                    id={item.title}
                    name={item.title}
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                  />
                  <label htmlFor={item.title}>{item.title}</label>
                </div>
              );
            })}
          </div>
          {password && <PasswordStrengthIndicator password={password} />}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="generate_password_button_container">
            <Button
              customClassName="generate_password_button"
              onClick={() => generatePassword(characterLength, checkboxData)}
              label="  GENERATE PASSWORD"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

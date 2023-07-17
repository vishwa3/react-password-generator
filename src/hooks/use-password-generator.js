import { useState } from "react";

function usePasswordGenerator() {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const Allowed = {
    Uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
    Lowers: "qwertyuiopasdfghjklzxcvbnm",
    Numbers: "1234567890",
    Symbols: "!@#$%^&*",
  };
  function getRandomCharacter(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }
  function generatePassword(characterLength, checkboxData) {
    const selectedCheckboxes = checkboxData.filter((item) => item.state);
    if (selectedCheckboxes.length === 0) {
      setErrorMessage("Select at least one option");
      setPassword("");
      return;
    }
    let charset = "";
    let secondaryCharset = "";
    selectedCheckboxes.forEach((item) => {
      switch (item.title) {
        case "Include Uppercase Letters": {
          charset = charset + getRandomCharacter(Allowed.Uppers);
          secondaryCharset = secondaryCharset + Allowed.Uppers;
          break;
        }

        case "Include Lowercase Letters": {
          charset = charset + getRandomCharacter(Allowed.Lowers);
          secondaryCharset = secondaryCharset + Allowed.Lowers;
          break;
        }

        case "Include Numbers": {
          charset = charset + getRandomCharacter(Allowed.Numbers);
          secondaryCharset = secondaryCharset + Allowed.Numbers;
          break;
        }
        case "Include Symbols": {
          charset = charset + getRandomCharacter(Allowed.Symbols);
          secondaryCharset = secondaryCharset + Allowed.Symbols;
          break;
        }
      }
    });
    for (let i = charset.length; i < characterLength; i++) {
      charset = charset + getRandomCharacter(secondaryCharset);
    }

    setPassword(charset);
    setErrorMessage("");
  }

  return { errorMessage, password, generatePassword };
}

export default usePasswordGenerator;

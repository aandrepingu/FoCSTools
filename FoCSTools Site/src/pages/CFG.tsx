import { useState } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [lang, setLang] = useState<string>("");
  const [text, setText] = useState<string[]>([]);
  const [CFGOutArray, setCFGOutArray] = useState<Set<string>>(new Set());
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(count - 1);
  const [maxLength, setMaxLength] = useState<number>(1);
  const [maxRecursion, setMaxRecursion] = useState<number>(1);
  const [maxNumPrinted, setMaxNumPrinted] = useState<number>(1);
  const [generated, setGenerated] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Get index of clicked text box
  function onTextClick(index: number) {
    setCurrentTextIndex(index);
  }

  // Append to grammar array
  function onAdd() {
    setCurrentTextIndex(count);
    setCount(count + 1);
    const newText = [...text, ""];
    setText(newText);
  }

  // Remove from grammar array
  // Remove from back
  // If a box is clicked, remove that one
  function onRemove() {
    if (count > 0) {
      setCount(count - 1);
      text.splice(currentTextIndex, 1);
      setCurrentTextIndex(count - 2);
    }
  }

  const productionError = (production: string): Boolean => {
    //Check if no digits
    if (production === lang) {
      return false;
    }

    return true;
  };

  // Output grammars in a div
  const renderOutputs = () => {
    //const renderValues: JSX.Element[] = [];
    const CFGStringArray: Set<string> = new Set();
    //const result: string[] = [];
    //const queue: { symbol: string, stringSoFar: string }[] = [];

    CFGStringArray.add(`Strings from the language ${lang}`);

    if (lang === "" || text.length < 1) {
      return;
    }

    const generateStrings = (
      stringSoFar: string,
      visited: Set<string>,
      depth: number
    ): void => {
      //Base case:
      if (depth > maxRecursion) {
        return;
      }
      if (stringSoFar.length > maxLength) {
        return;
      }

      if (stringSoFar.length <= maxLength && stringSoFar.indexOf(lang) === -1) {
        if (
          !visited.has(stringSoFar) &&
          visited.size < maxNumPrinted &&
          !randomize
        ) {
          visited.add(stringSoFar);
          CFGStringArray.add(stringSoFar);
          return;
        } else if (!visited.has(stringSoFar) && randomize) {
          visited.add(stringSoFar);
          CFGStringArray.add(stringSoFar);
          return;
        }
      }

      for (let i = 0; i < stringSoFar.length; i++) {
        if (stringSoFar[i] === lang) {
          //Loop through product rules
          for (const production of text) {
            //Apply rule
            //newString.replace(new RegExp(lang, "g"), production);
            var isValid = productionError(production);
            if (isValid) {
              const newString =
                stringSoFar.slice(0, i) + production + stringSoFar.slice(i + 1);
              //recurse with rule
              generateStrings(newString, visited, depth + 1);
            }
          }
        }
      }
    };

    generateStrings(lang, new Set(), 0);

    //set random values in array
    if (randomize) {
      let tmpArray = Array.from(CFGStringArray);
      tmpArray = tmpArray.slice(1);
      tmpArray = shuffle(tmpArray);
      tmpArray.unshift(`Strings from the language ${lang}`);
      //Only add the first maxNumPrinted elemts from randomized array
      if (maxNumPrinted < tmpArray.length + 1) {
        let tmpArray1 = Array(maxNumPrinted + 1);
        for (let i = 0; i < maxNumPrinted + 1; i++) {
          tmpArray1[i] = tmpArray[i];
        }
        tmpArray = tmpArray1;
      }

      setCFGOutArray(new Set(tmpArray));
    } else {
      setCFGOutArray(CFGStringArray);
    }
  };

  // Clear all text boxes and array
  function clear() {
    const newText = [""];
    setText(newText);
    setCount(0);
    setCurrentTextIndex(-1);
    setGenerated(false);
  }

  function generate() {
    renderOutputs();
    setGenerated(true);
  }

  // Edit the value in the array
  const onWrite = (index: number, value: string) => {
    const newText = [...text];
    newText[index] = value;
    setText(newText);
  };

  // Handle special keypresses "|" and "Backspace" to add and remove
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === "|") {
      setCount(count + 1);
      const newText = [...text, ""];
      setText(newText);
      e.preventDefault();
    } else if (e.key === "Backspace" && !value) {
      if (count > 0) {
        setCount(count - 1);
        text.splice(currentTextIndex, 1);
      }
      e.preventDefault();
    }
  };

  // Edit a text box
  const handleChange = (
    index: number,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    if (value[value.length - 1] === "|") return;
    onWrite(index, value);
  };

  // Handle the name of the language being generated
  const handleLang = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLang(value);
  };

  // Toggle settings bar
  function toggleSettings(){
    setShowSettings(!showSettings);
  }

  function toggleRandomize(){
    setRandomize(!randomize);
  }

  return (
    <>
      <h2 className="CFG_Text_Div">Create a Context Free Grammar</h2>
      <div className="CFG_FlexBox_Div">
        <div className="CFG_Button_Div">
          <button onClick={onAdd}>Add</button>
          <button onClick={onRemove}>Remove</button>
          <button onClick={clear}>Clear</button>
          <button onClick={generate}>Generate</button>
        </div>
        <div className="CFG_Rules">
          <input
            type="text"
            placeholder="Variable"
            value={lang}
            onChange={(e) => handleLang(e)}
          />
          {Array.from({ length: count }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={text[index]}
              placeholder="ε"
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyPress(e)}
              onClick={() => onTextClick(index)}
            />
          ))}
        </div>
      </div>

      {showSettings && (<div className="settingsBox">
        <label>Randomize Outputs: {randomize}</label>
        <div className="setting">
          <button onClick={toggleRandomize}>{randomize ? 'On' : 'Off'}</button>
        </div>
        <div className="setting">
          <label>Max String Length: </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.currentTarget.value))}
          />
          <label> {maxLength}</label>
        </div>
        <div className="setting">
          <label>Recursive Depth: </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={maxRecursion}
            onChange={(e) => setMaxRecursion(Number(e.currentTarget.value))}
          />
          <label> {maxRecursion}</label>
        </div>
        <div className="setting">
          <label>Number of Strings: </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={maxNumPrinted}
            onChange={(e) => setMaxNumPrinted(Number(e.currentTarget.value))}
          />
          <label> {maxNumPrinted}</label>
        </div>
      </div>)}
      <div>
        <button className="gear" onClick={toggleSettings}>⚙️</button>
      </div>
      {generated && (
        <div className="outputBox">
          {Array.from(CFGOutArray).map((s, ind) => {
            return <h2 key={ind}>{s}</h2>;
          })}
        </div>
      )}
    </>
  );
}

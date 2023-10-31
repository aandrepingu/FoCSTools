import { useState } from "react";
import { useRef } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [lang, setLang] = useState<string>("");
  const [text, setText] = useState<string[]>([]);
  const [CFGOutArray, setCFGOutArray] = useState<Set<string>>(new Set());
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(count - 1);
  const inputRef = useRef(new Array());
  const [maxLength, setMaxLength] = useState<number>(1);
  const [maxRecursion, setMaxRecursion] = useState<number>(1);
  const [maxNumPrinted, setMaxNumPrinted] = useState<number>(1);
  const [maxTime, setMaxTime] = useState<number>(10);
  const [generated, setGenerated] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);

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
    setSettingsUpdated(true);
  }

  // Remove from grammar array
  // Remove from back
  // If a box is clicked, remove that one
  function onRemove() {
    if (count > 0) {
      setCount(count - 1);
      text.splice(currentTextIndex, 1);
      setCurrentTextIndex(count - 2);
      setSettingsUpdated(true);
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
    var startTime = new Date().getTime();
    const CFGStringArray: Set<string> = new Set();
    //const result: string[] = [];
    //const queue: { symbol: string, stringSoFar: string }[] = [];

    CFGStringArray.add(`Strings from the language ${lang}`);

    if (lang === "" || text.length < 1) {
      return;
    }

    /*
    input string s:

      base case:
          if only terminals and string length matches
      if equal: return YES
      if not: return (exit branch)
          else
      return (if only terminals but doesnt match length)


      for each S in substring:
      for each production rule:
      newString = apply rule
      check beginnings
      check endings
      last change:
      check substrings (ex. S000S)
      if valid
      function(newString)

    */

    const generateStrings = (
      stringSoFar: string,
      visited: Set<string>,
      depth: number
    ): void => {
      //Base case:
      var endTime = new Date().getTime();
      console.log(endTime - startTime);
      if (endTime - startTime >= maxTime * 1000) {
        console.log("ended!");
        return;
      }

      if (depth > maxRecursion) {
        return;
      }
      if (stringSoFar.length > maxLength) {
        return;
      }

      if (
        stringSoFar.length <= maxLength &&
        stringSoFar.indexOf(lang) === -1 &&
        !visited.has(stringSoFar)
      ) {
        if (visited.size < maxNumPrinted && !randomize) {
          visited.add(stringSoFar);
          CFGStringArray.add(stringSoFar);
          return;
        } else if (randomize) {
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
              const newString = stringSoFar.slice(0, i) + production + stringSoFar.slice(i + 1);
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
    setSettingsUpdated(true);
  }

  function generate() {
    renderOutputs();
    setSettingsUpdated(false);
    setGenerated(true);
  }

  // Edit the value in the array
  const onWrite = (index: number, value: string) => {
    const newText = [...text];
    newText[index] = value;
    setText(newText);
    setSettingsUpdated(true);
  };

  // Handle special keypresses

  const handleKeyPress = (index:number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    // |: add a box at the end
    if (e.key === "|") {  
      setCount(count + 1);
      const newText = [...text, ""];
      setText(newText);
      e.preventDefault();
    }
    // Backspace: deletes the current box if the box is empty
    else if (e.key === "Backspace" && !value) {
      if (count > 0) {
        setCount(count - 1);
        text.splice(currentTextIndex, 1);
      }
      if(index==count-1)
      {
        inputRef.current[count-2].focus();
      }
      e.preventDefault();
    }
    // ArrowUp: Goes to the previous box
    else if (e.key === "ArrowUp"){
      if(index>0)
      {
        inputRef.current[index-1].focus();
        e.preventDefault();
      }
    }
    // ArrowDpwm: Goes to the next box
    else if (e.key === "ArrowDown"){
      if(index<count)
      {
        inputRef.current[index+1].focus();
        e.preventDefault();
      }
    }
    
  };

  // Edit a text box
  const handleChange = (
    index: number,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    onWrite(index, value);
  };

  // Handle the name of the language being generated
  const handleLang = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLang(value);
  };

  // Toggle settings bar
  function toggleSettings() {
    setShowSettings(!showSettings);
  }

  function toggleRandomize() {
    setRandomize(!randomize);
    setSettingsUpdated(true);
  }

  function changeMaxLength(e: React.FormEvent<HTMLInputElement>) {
    const value = Number(e.currentTarget.value);
    setMaxLength(value);
    setSettingsUpdated(true);
  }

  function changeRecursionDepth(e: React.FormEvent<HTMLInputElement>){
    const value = Number(e.currentTarget.value);
    setMaxRecursion(value);
    setSettingsUpdated(true);
  }

  function changeNumberStrings(e: React.FormEvent<HTMLInputElement>){
    const value = Number(e.currentTarget.value);
    setMaxNumPrinted(value);
    setSettingsUpdated(true);
  }

  return (
    <>
      <h2 className="CFG_Text_Div">Create a Context Free Grammar</h2>
      <div className="CFGcontrols">
      <div className="CFG_FlexBox_Div" style={{flexBasis: "25%","marginBottom":"10px"}}>
        <div className="CFG_Button_Div">
          <button onClick={onAdd}>Add</button>
          <button onClick={onRemove}>Remove</button>
          <button onClick={clear}>Clear</button>
          <button 
            style={{ backgroundColor: settingsUpdated ? "darkcyan" : "black" }}
            onClick={generate}
          >Generate</button>
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
              ref={(element)=>inputRef.current[index]=element}
              autoFocus
              type="text"
              value={text[index]}
              placeholder="ε"
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyPress(index,e)}
              onClick={() => onTextClick(index)}
              
            />
          ))}
        </div>
      </div>
      <div> <input type="text" placeholder="Input String" name="" id="" /></div>
      <div style={{flexBasis: "25%"}}>
      {generated && (
        <div className="outputBox">
          {Array.from(CFGOutArray).map((s, ind) => {
            return <h2 key={ind}>{s}</h2>;
          })}
        </div>
      )}</div>
      </div>
      {showSettings && (
        <div className="settingsBox">
          <div className="setting">
            <label className="setting-name">Randomize Outputs: {randomize}</label>
            <button onClick={toggleRandomize}>
              {randomize ? "On" : "Off"}
            </button>
          </div>
          <div className="setting">
            <label className="setting-name">Max String Length: </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={maxLength}
              onChange={(e) => changeMaxLength(e)}
            />
            <label className="setting-val"> {maxLength}</label>
          </div>
          <div className="setting">
            <label className="setting-name">Recursive Depth: </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={maxRecursion}
              onChange={(e) => changeRecursionDepth(e)}
            />
            <label className="setting-val"> {maxRecursion}</label>
          </div>
          <div className="setting">
            <label className="setting-name">Number of Strings: </label>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={maxNumPrinted}
              onChange={(e) => changeNumberStrings(e)}
            />
            <label className="setting-val"> {maxNumPrinted}</label>
          </div>
          <div className="setting">
            <label  className="setting-name">Time of Recursive Search: </label>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.currentTarget.value))}
            />
            <label className="setting-val"> {maxTime}</label>
          </div>
        </div>
      )}
      <div>
        <button className="gear" onClick={toggleSettings}>
          ⚙️
        </button>
      </div>
      
    </>
  );
}

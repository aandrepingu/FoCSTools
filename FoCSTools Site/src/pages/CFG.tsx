import React, { useRef, useState } from "react";
import "./CFG.css";

export default function CFG() {
  // const [count, setCount] = useState<number>(0);
  // const [langCount, setLangCount] = useState<number>(5);
  // const [lang, setLang] = useState<string>("");
  // const [multLang, setMultLang] = useState<string[]>([]);
  // const [text, setText] = useState<string[]>([]);
  // const [inputString, setInputString] = useState<string>("");
  // const [langText, setLangText] = useState<string[][]>([[]]);
  // const [CFGOutArray, setCFGOutArray] = useState<Set<string>>(new Set());
  // const [currentLangIndex, setCurrentLangIndex] = useState<number>(0);
  // const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  // const inputRef = useRef(new Array());
  // const [width, setWidth] = useState<number[]>(new Array());
  // const [maxLength, setMaxLength] = useState<number>(1);
  // const [maxRecursion, setMaxRecursion] = useState<number>(1);
  // const [maxNumPrinted, setMaxNumPrinted] = useState<number>(1);
  // const [maxTime, setMaxTime] = useState<number>(10);
  // const [generated, setGenerated] = useState(false);
  // const [randomize, setRandomize] = useState(false);
  // const [showSettings, setShowSettings] = useState(false);
  // const [settingsUpdated, setSettingsUpdated] = useState(false);

  // original version

  const [count, setCount] = useState<number[]>([1]);
  const [langCount, setLangCount] = useState<number>(1);
  const [lang, setLang] = useState<string>("");
  const [multLang, setMultLang] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const [inputString, setInputString] = useState<string>("");
  const [langText, setLangText] = useState<string[][]>([[""]]);
  const [CFGOutArray, setCFGOutArray] = useState<Set<string>>(new Set());
  const [currentLangIndex, setCurrentLangIndex] = useState<number>(0);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const inputRef = useRef(new Array(new Array()));
  const [width, setWidth] = useState<number[][]>([[8]]);
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
  function onTextClick(index: number, indexLang:number) {
    setCurrentTextIndex(index);
    setCurrentLangIndex(indexLang);
  }
  function onVariableClick(indexLang:number) {
    setCurrentLangIndex(indexLang);
  }

  // Append to grammar array
  function onAdd() {
    
    setCurrentTextIndex(count[currentLangIndex]); // Set current text index

    // Update the count array
    count[currentLangIndex]++;

    // Update the langText array
    const newText = [...langText[currentLangIndex], ""]; 
    langText[currentLangIndex]=newText;

    const newWidth = [...width[currentLangIndex], 8]; 
    width[currentLangIndex] = newWidth;
    
    console.log(count[currentLangIndex]);
    setSettingsUpdated(true); 
  }


  // Remove from grammar array
  // Remove from back
  // If a box is clicked, remove that one
  function onRemove() {
    if (count[currentLangIndex] > 1) {
      const newCount=[...count];
      newCount[currentLangIndex]--;
      setCount(newCount);
      langText[currentLangIndex].splice(currentTextIndex, 1);
      width[currentLangIndex].splice(currentTextIndex, 1);
      setCurrentTextIndex(currentTextIndex-1);
      if(currentTextIndex>0){
        inputRef.current[currentLangIndex][currentTextIndex-1].focus();
      }
      setSettingsUpdated(true);
    }
  }

  function onAddLang() {
    setCurrentLangIndex(langCount);
    setLangCount(langCount + 1);
    const newLangText = [...langText, new Array("")];
    setLangText(newLangText);

    const newCount= [...count,1];
    setCount(newCount);

    const newLangWidth=[8];
    const newWidth=[...width,newLangWidth];
    setWidth(newWidth);

    setSettingsUpdated(true);
  }

  function onRemoveLang(indexLang:number) {
    if (langCount > 0) {
      console.log(indexLang);
      setLangCount(langCount-1);
      setCurrentLangIndex(indexLang-1);
      langText.splice(indexLang, 1);
      count.splice(indexLang,1);
      width.splice(indexLang,1);
      if(indexLang>0)
      {
        inputRef.current[indexLang-1][count[indexLang-1]-1].focus();
        inputRef.current[indexLang-1][count[indexLang-1]-1].setSelectionRange(
          langText[indexLang-1][count[indexLang-1]-1].length,
          langText[indexLang-1][count[indexLang-1]-1].length
        );
      }
      // if(indexLang===0)
      // {
      //   inputRef.current[0][count[0]-1].focus();
      //   inputRef.current[0][count[0]-1].setSelectionRange(
      //     langText[0][count[0]-1].length,
      //     langText[0][count[0]-1].length
      //   );
      // }
      setSettingsUpdated(true);
    }
  }

  const productionError = (production: string, whichLang: string): Boolean => {
    //Check if no digits
    if (production === whichLang) {
      return false;
    }
    return true;
  };

  function checkBeginning(substring: string, matchString: string): boolean {
    let beginningString = "";
    let i = 0;
    for (i; i < substring.length; i++) {
      if (substring[i] === lang) break;
      beginningString.concat(substring[i]);
    }
    if (beginningString.length > matchString.length) return false;
    for (let j = 0; j < beginningString.length; j++) {
      if (beginningString[j] != matchString[j]) return false;
    }
    return true;
  }

  function checkEnding(substring: string, matchString: string): boolean {
    let beginningString = "";
    let i = substring.length - 1;
    for (i; i >= 0; i--) {
      if (substring[i] === lang) break;
      beginningString.concat(substring[i]);
    }
    if (beginningString.length > matchString.length) return false;
    for (let j = 0; j < beginningString.length; j++) {
      if (beginningString[j] != matchString[j]) return false;
    }
    return true;
  }

  function checkSubstring(substring: string, matchString: string): boolean {
    return true;
  }

  /*
    input string s:

      base case:
          if only terminals and string length matches
      if equal: return YES
      if not: return (exit branch)
          else
      return (if only terminals but doesntmatch length)


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
  function inputStringParser(
    matchString: string,
    currentString: string,
    empty: boolean
  ): boolean {
    //base cases
    if (!empty) {
      if (currentString.length > matchString.length) return false;
      else if (currentString == matchString) return true;
    } else if (empty) {
      let nonTerminals = 0;
      let terminals = true;
      for (let i = 0; i < currentString.length; i++) {
        if (currentString[i] == lang) {
          terminals = false;
        } else {
          nonTerminals++;
        }
      }
      if (nonTerminals > matchString.length) {
        return false;
      }
      if (terminals) {
        if (currentString == matchString) {
          return true;
        }
        return false;
      }
    }

    for (let i = 0; i < currentString.length; i++) {
      if (currentString[i] == lang) {
        for (const production of text) {
          var newString = currentString;
          newString =
            newString.slice(0, i) + production + newString.slice(i + 1);

          if (!checkBeginning(currentString, matchString)) {
            return false;
          }
          if (!checkEnding(currentString, matchString)) {
            return false;
          }
          if (!checkSubstring(currentString, matchString)) {
            return false;
          }
          inputStringParser(matchString, newString, empty);
        }
      }
    }
    return true;
  }

  const testParser = () => {
    let empty = text.includes("");
    let bool = inputStringParser(inputString, lang, empty);
    console.log(bool);
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
        if (multLang.includes(stringSoFar[i])) {
          //Loop through product rules
          var indexOfLanguage = multLang.indexOf(stringSoFar[i]); 
          for (const production of langText[indexOfLanguage]) {
            //Apply rule
            //newString.replace(new RegExp(lang, "g"), production);
            var isValid = productionError(production, multLang[indexOfLanguage]);
            if (isValid) {
              var newString = stringSoFar;
              newString =
                newString.slice(0, i) + production + newString.slice(i + 1);
              //recurse with rule
              generateStrings(newString, visited, depth + 1);
            }
          }
        }
      }
    };

    generateStrings(multLang[0], new Set(), 0);

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
    const newLangText = [[]];
    setLangText(newLangText);
    const newCount = [0]
    setCount(newCount);
    setLangCount(0);
    const newWidth = new Array();
    setWidth(newWidth);
    
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
    const newText = [...langText[currentLangIndex]];
    newText[index] = value;
    const newLangText = [...langText];
    newLangText[currentLangIndex]=newText;
    setLangText(newLangText);
    setSettingsUpdated(true);

    const newWidth = [...width];
    newWidth[currentLangIndex][index] = value.length * 8;
    setWidth(newWidth);
  };

  // Handle special keypresses

  const handleKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    // |: add a box at the end
    if (e.key === "|") {
      onAdd();
      e.preventDefault();
    }
    // Backspace: deletes the current box if the box is empty
    else if (e.key === "Backspace" && !value) {
      onRemove();
      // if (index == count[currentLangIndex] - 1 && count[currentLangIndex] >= 2) {
      //   setCurrentTextIndex(index - 1);
      //   inputRef.current[currentLangIndex][count[currentLangIndex] - 2].focus();
      //   inputRef.current[currentLangIndex][count[currentLangIndex] - 2].setSelectionRange(
      //     langText[currentLangIndex][index - 1].length,
      //     langText[currentLangIndex][index - 1].length
      //   );
      //   count[currentLangIndex]=count[currentLangIndex]-1;
      // }
      e.preventDefault();
    }
    // ArrowUp: Goes to the previous box
    else if (e.key === "ArrowLeft") {
      if (index > 0) {
        if (e.currentTarget.selectionStart === 0) {
          setCurrentTextIndex(index - 1);
          inputRef.current[currentLangIndex][index - 1].focus();
          inputRef.current[currentLangIndex][index - 1].setSelectionRange(
            langText[currentLangIndex][index - 1].length,
            langText[currentLangIndex][index - 1].length
          );
          e.preventDefault();
        }
      }
    }
    // ArrowDown: Goes to the next box
    else if (e.key === "ArrowRight") {
      if (index + 1 < count[currentLangIndex]) {
        if (e.currentTarget.selectionStart === langText[currentLangIndex][index].length) {
          setCurrentTextIndex(index + 1);
          inputRef.current[currentLangIndex][index + 1].focus();
          inputRef.current[currentLangIndex][index + 1].setSelectionRange(0, 0);
          e.preventDefault();
        }
      }
    }
    else if(e.key==="ArrowUp")
    {
      if(currentLangIndex > 0){
        setCurrentLangIndex(currentLangIndex-1);
        if(count[currentLangIndex-1] > index){
          inputRef.current[currentLangIndex - 1][index].focus();
        } else {
          setCurrentTextIndex(count[currentLangIndex-1]-1);
          inputRef.current[currentLangIndex - 1][count[currentLangIndex-1]-1].focus(); 
        }
        e.preventDefault();
      }
    }
    else if(e.key==="ArrowDown")
    {
      if(currentLangIndex+1<langCount){
        if(currentTextIndex+1>count[currentLangIndex+1]){
          setCurrentTextIndex(count[currentLangIndex+1]-1);
          inputRef.current[currentLangIndex+1][count[currentLangIndex+1]-1].focus();
        } else{
          inputRef.current[currentLangIndex+1][currentTextIndex].focus();
        }
        setCurrentLangIndex(currentLangIndex+1);
        e.preventDefault();
      }
      
    }
    else if(e.key === "Tab"&&e.shiftKey)
    {
      e.preventDefault();
      if (index > 0) {
          setCurrentTextIndex(index - 1);
          inputRef.current[currentLangIndex][index - 1].focus();
          inputRef.current[currentLangIndex][index - 1].setSelectionRange(0,0)
        }
    }
    else if(e.key === "Tab")
    {
      e.preventDefault();
      if (index + 1 < count[currentLangIndex]) {
          setCurrentTextIndex(index + 1);
          inputRef.current[currentLangIndex][index + 1].focus();
          inputRef.current[currentLangIndex][index + 1].setSelectionRange(0, 0);
      }
    }
    else if(e.key==="Enter")
    {
      e.preventDefault();
      onAddLang();
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

  function changeRecursionDepth(e: React.FormEvent<HTMLInputElement>) {
    const value = Number(e.currentTarget.value);
    setMaxRecursion(value);
    setSettingsUpdated(true);
  }

  function changeNumberStrings(e: React.FormEvent<HTMLInputElement>) {
    const value = Number(e.currentTarget.value);
    setMaxNumPrinted(value);
    setSettingsUpdated(true);
  }

  return (
    <>
      <h2 className="CFG_Text_Div">Create a Context Free Grammar</h2>
      <div className="CFGcontrols">
        <div
          className="CFG_FlexBox_Div"
          style={{ flexBasis: "25%", marginBottom: "10px" }}
        >
          <div className="CFG_Button_Div">
            <button onClick={onAdd}>Add</button>
            <button onClick={onRemove}>Remove</button>
            <button onClick={clear}>Clear</button>
            <button
              style={{
                backgroundColor: settingsUpdated ? "darkcyan" : "black",
              }}
              onClick={generate}
            >
              Generate
            </button>
          </div>
          {Array.from({length: langCount}).map((_,indexLang) => (
            <div className="CFG_Rules" key={indexLang}>
              <input
                style={{ width: 60 }}
                type="text"
                placeholder="Variable"
                value={multLang[indexLang]}
                onChange={(e) => handleLang(e)}
                onClick={() => onVariableClick(indexLang)}
              />
              {Array.from({ length: count[indexLang] }).map((_, index) => (
                <input
                  style={{ width: width[indexLang][index] }}
                  key={index}
                  ref={(element) => {
                    if (!inputRef.current[indexLang]) {
                      inputRef.current[indexLang] = [];
                    }
                    inputRef.current[indexLang][index] = element;
                  }}
                  autoFocus
                  type="text"
                  value={langText[indexLang][index]}
                  placeholder="ε"
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyPress(index, e)}
                  onClick={() => onTextClick(index,indexLang)}
                />
              ))}
              <button onClick={()=>onRemoveLang(indexLang)}>X</button>
            </div>
          ))}
          <button onClick={onAddLang}>Add Language or Press 'Enter'</button>
          <div>
            { multLang.length }
          </div>
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Input String"
            name=""
            id=""
            onChange={(e) => setInputString(e.currentTarget.value)}
          />
          <button onClick={testParser}>{"Check Input String"}</button>
        </div>
        <div style={{ flexBasis: "25%" }}>
          {generated && (
            <div className="outputBox">
              {Array.from(CFGOutArray).map((s, ind) => {
                return <h2 key={ind}>{s}</h2>;
              })}
            </div>
          )}
        </div>
      </div>
      {showSettings && (
        <div className="settingsBox">
          <div className="setting">
            <label className="setting-name">
              Randomize Outputs: {randomize}
            </label>
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
            <label className="setting-name">Time of Recursive Search: </label>
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

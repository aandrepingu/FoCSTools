import React, { useRef, useState, useEffect } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [langCount, setLangCount] = useState<number>(0);
  const [lang, setLang] = useState<string>("");
  const [multLang, setMultLang] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const [inputString, setInputString] = useState<string>("");
  const [langText, setLangText] = useState<string[][]>([[]]);
  const [CFGOutArray, setCFGOutArray] = useState<Set<string>>(new Set());
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(count - 1);
  const inputRef = useRef(new Array());
  const [width, setWidth] = useState<number[]>(new Array());
  // const {variableWidth, setVariable} = useState<number>(8);
  const [maxLength, setMaxLength] = useState<number>(10);
  const [maxRecursion, setMaxRecursion] = useState<number>(8);
  const [maxNumPrinted, setMaxNumPrinted] = useState<number>(9);
  const [maxTime, setMaxTime] = useState<number>(5);
  const [generated, setGenerated] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const match = useRef(false);
  const cutRecursion = useRef(false);
  const [valid, setValid] = useState<number>(0);
  const [shufflingDone, setShufflingDone] = useState(false);

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    let shuffleTimer: number | undefined;
    const shuffleStep = 1000;
    const shuffleDuration = maxTime * 1000;

    const shuffleStrings = () => {
      let tmpArr = Array.from(CFGOutArray);
      const first = tmpArr[0];
      tmpArr = tmpArr.slice(1);
      tmpArr = shuffle(tmpArr);
      tmpArr.unshift(first);
      setCFGOutArray(new Set(tmpArr));
    };

    if (randomize && generated && !settingsUpdated) {
      shuffleStrings();

      shuffleTimer = setTimeout(() => {
        setGenerated(false);
        setShufflingDone(true);
      }, shuffleDuration);

      const interval = setInterval(shuffleStrings, shuffleStep);

      return () => {
        clearInterval(interval);
        clearTimeout(shuffleTimer);
      };
    } else if (!randomize && generated) {
      //setGenerated(true);
    }
  }, [generated, randomize, settingsUpdated]);

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

    const newWidth = [...width, 8];
    setWidth(newWidth);

    setSettingsUpdated(true);
  }

  // Remove from grammar array
  // Remove from back
  // If a box is clicked, remove that one
  function onRemove() {
    if (count > 0) {
      setCount(count - 1);
      text.splice(currentTextIndex, 1);
      width.splice(currentTextIndex, 1);
      setCurrentTextIndex(count - 2);
      setSettingsUpdated(true);
    }
  }

  function onAddLang() {}

  function onRemoveLang() {}

  const productionError = (production: string): Boolean => {
    //Check if no digits
    if (production === lang) {
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
    if (beginningString === "") {
      return true;
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
    if (beginningString === "") {
      return true;
    }
    if (beginningString.length > matchString.length) return false;
    for (let j = 0; j < beginningString.length; j++) {
      if (beginningString[j] != matchString[j]) return false;
    }
    return true;
  }

  function checkSubstring(substring: string, matchString: string): boolean {
    let arr: Array<String> = [];
    let tempStr = "";
    let start = 0;
    let foundStart = false;
    let end = 0;
    for (let i = 0; i < substring.length; i++) {
      if (substring[i] === lang && !foundStart) {
        start = i;
        foundStart = true;
      }
      if (substring[i] === lang && foundStart && i != substring.length - 1) {
        end = i;
        if (start + 1 != end) {
          tempStr = substring.substring(start + 1, end);
          arr.push(tempStr);
        }
        start = end;
        end = 0;
      }
    }
    // S000S11S   11 000  11
    let tempMatchString = matchString;
    for (const str in arr) {
      var indexStr = tempMatchString.indexOf(str);
      if (indexStr === -1) return false;
    }
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

  //Fails for cycles between substrings. Implement Hash table to avoid recalculating looping substrings. O(1) lookup required!

  const inputStringParser = (
    matchString: string,
    currentString: string,
    empty: boolean,
    visited: Set<string>,
    depth: number
  ): void => {
    //base cases
    if (depth >= 50) {
      return;
    }
    if (cutRecursion.current === true) {
      return;
    }
    if (visited.has(currentString)) {
      return;
    } else {
      visited.add(currentString);
    }
    if (!empty) {
      if (currentString.length > matchString.length) {
        return;
      } else if (currentString == matchString) {
        match.current = true;
        cutRecursion.current = true;
        //console.log("Match = True");

        return;
      }
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
        return;
      }
      if (terminals) {
        if (currentString == matchString) {
          //console.log("Match = True");
          match.current = true;
          cutRecursion.current = true;
          return;
        }
        return;
      }
    }

    for (let i = 0; i < currentString.length; i++) {
      if (currentString[i] == lang) {
        for (const production of text) {
          var newString = currentString;
          newString =
            newString.slice(0, i) + production + newString.slice(i + 1);

          if (!checkBeginning(currentString, matchString)) {
            return;
          }
          if (!checkEnding(currentString, matchString)) {
            return;
          }
          if (!checkSubstring(currentString, matchString)) {
            return;
          }
          inputStringParser(matchString, newString, empty, visited, depth + 1);
        }
      }
    }
    return;
  };

  const testParser = () => {
    let empty = text.includes("");
    //let tmp = false;
    match.current = false;
    cutRecursion.current = false;
    inputStringParser(inputString, lang, empty, new Set(), 0);
    console.log(match.current);
    if (match.current) {
      setValid(1);
    } else {
      setValid(0);
    }
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

      //console.log(endTime - startTime);
      if (endTime - startTime >= maxTime * 1000) {
        //console.log("ended!");
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
    const newWidth = new Array();
    setWidth(newWidth);
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

  function progress() {
    var elem = document.getElementById("bar");
    var durationInSeconds = maxTime; // Set your desired duration in seconds
    var targetWidth = 100; // 100% width
    //elem!.style.width = 0 + "%";

    var width = 0; // Initial width
    var interval = 10; // Milliseconds between each frame update
    var step = targetWidth / ((durationInSeconds * 1000) / interval); // Calculate the step size

    var id = setInterval(frame, interval);

    function frame() {
      if (width >= targetWidth) {
        clearInterval(id);
      } else {
        width += step;
        elem!.style.width = width + "%";
      }
    }
  }

  // Edit the value in the array
  const onWrite = (index: number, value: string) => {
    const newText = [...text];
    newText[index] = value;
    setText(newText);
    setSettingsUpdated(true);

    const newWidth = [...width];
    newWidth[index] = value.length * 8;
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
      //console.log(count, currentTextIndex);
      if (index == count - 1 && count >= 2) {
        setCurrentTextIndex(index - 2);
        inputRef.current[count - 2].focus();
      }
      e.preventDefault();
    }
    // ArrowUp: Goes to the previous box
    else if (e.key === "ArrowLeft") {
      if (index > 0) {
        if (e.currentTarget.selectionStart === 0) {
          setCurrentTextIndex(index - 1);
          inputRef.current[index - 1].focus();
          inputRef.current[index - 1].setSelectionRange(
            text[index - 1].length,
            text[index - 1].length
          );
          // inputRef.current.
          e.preventDefault();
        }
      }
    }
    // ArrowDown: Goes to the next box
    else if (e.key === "ArrowRight") {
      if (index + 1 < count) {
        if (e.currentTarget.selectionStart === text[index].length) {
          setCurrentTextIndex(index + 1);
          inputRef.current[index + 1].focus();
          inputRef.current[index + 1].setSelectionRange(0, 0);
          e.preventDefault();
        }
      }
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      if (index > 0) {
        setCurrentTextIndex(index - 1);
        inputRef.current[index - 1].focus();
        inputRef.current[index - 1].setSelectionRange(0, 0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (index + 1 < count) {
        setCurrentTextIndex(index + 1);
        inputRef.current[index + 1].focus();
        inputRef.current[index + 1].setSelectionRange(0, 0);
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
  function toggleSettings(e: React.MouseEvent<HTMLElement>) {
    (e.target as HTMLElement).classList.toggle("open");
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

  function outputParser() {
    if (valid === 1) {
      return inputString + " is valid.";
      //return "VALID!";
    } else if (valid === 0) {
      return inputString + " is invalid.";
    } else if (valid === 2) {
      return "New Input Check String.";
    }
    //return "INVALID!";
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
              onClick={() => {
                progress();
                generate();
              }}
            >
              Generate
            </button>
          </div>
          <div className="CFG_Rules">
            <input
              style={{ width: 60 }}
              type="text"
              placeholder="Variable"
              value={lang}
              onChange={(e) => handleLang(e)}
            />
            <div className="CFG_Prod_Candidates">
              {Array.from({ length: count }).map((_, index) => (
                <input
                  style={{ width: width[index] }}
                  key={index}
                  ref={(element) => (inputRef.current[index] = element)}
                  autoFocus
                  type="text"
                  value={text[index]}
                  placeholder="ε"
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyPress(index, e)}
                  onClick={() => onTextClick(index)}
                />
              ))}
            </div>
            <button onClick={onRemoveLang} className="xButton">
              <span>&times;</span>
            </button>
          </div>
          <button onClick={onAddLang}>Add Language or Press 'Enter'</button>
        </div>
        <div style={{ maxWidth: "30%" }}>
          <div>
            {" "}
            <input
              type="text"
              placeholder="Input String"
              name=""
              id=""
              onChange={(e) => (
                setInputString(e.currentTarget.value), setValid(2)
              )}
            />
            <button onClick={testParser}>{"Check Input String"}</button>
          </div>
          <div
            className="inputStringText"
            style={{ maxWidth: "100%", overflow: "scroll" }}
          >
            <h2>{outputParser()}</h2>
          </div>
        </div>
        <div style={{ flexBasis: "25%" }}>
          {(generated || shufflingDone) && (
            <div className="outputBox">
              <div className="progressBar" id="bar"></div>
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

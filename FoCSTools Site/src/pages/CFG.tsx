import { useState } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [lang, setLang] = useState<string>("");
  const [text, setText] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(count - 1);
  const [generated, setGenerated] = useState(false);

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

  // Output grammars in a div
  const renderOutputs = () => {
    const CFGStringArray: Set<string> = new Set();
    var max_size = 4;
    //const result: string[] = [];
    //const queue: { symbol: string, stringSoFar: string }[] = [];

    //renderValues.push(<h2>Strings from the language {lang}</h2>);
    CFGStringArray.add("Strings from the language " + lang);

    if (lang === "" || text.length < 1) {
      return;
    }

    const generateStrings = (
      stringSoFar: string,
      visited: Set<string>
    ): void => {
      //Base case:
      if (stringSoFar.length > max_size) {
        return;
      }

      if (stringSoFar.length <= max_size && stringSoFar.indexOf(lang) === -1) {
        if (!visited.has(stringSoFar)) {
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
            const newString =
              stringSoFar.slice(0, i) + production + stringSoFar.slice(i + 1);
            //recurse with rule
            generateStrings(newString, visited);
          }
        }
      }
    };

    generateStrings(lang, new Set());

    return CFGStringArray;
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
    if (e.key === "|") onAdd();
    else if (e.key === "Backspace" && !value) onRemove();
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
          <input type="text" value={lang} onChange={(e) => handleLang(e)}/>
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
        <h1>{currentTextIndex}</h1>
        <h1>{lang}</h1>
      </div>
      {generated && <div className="outputBox">{renderOutputs()}</div>}
    </>
  );
}

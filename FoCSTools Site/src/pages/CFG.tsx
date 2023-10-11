import { useState } from "react";
import "./CFG.css";


export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [lang, setLang] = useState<string>("");
  const [text, setText] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(count - 1);

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
    const renderValues: JSX.Element[] = []
    for(let i = 0; i < text.length; i++){
      renderValues.push(<p key={i}>{ text[i] }</p>);
    }
    return renderValues;
  };

  // Clear all text boxes and array
  function clear() {
    const newText = [""];
    setText(newText);
    setCount(0);
    setCurrentTextIndex(-1);
  }

  // Edit the value in the array
  const onWrite = (index: number, value: string) => {
    const newText = [...text];
    newText[index] = value;
    setText(newText);
  }

  // Handle special keypresses "|" and "Backspace" to add and remove
  const handleKeyPress=(e: React.KeyboardEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    if(e.key==='|') onAdd();
    else if(e.key==='Backspace'&& !value)onRemove();
  }

  // Edit a text box
  const handleChange=(index: number, e:React.FormEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    if(value[value.length-1]==='|')return
    onWrite(index,value)
  }

  // Handle the name of the language being generated
  const handleLang=(e:React.FormEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    setLang(value)
  }
  return (
    <>
      <h2 className="CFG_Text_Div">Create a Context Free Grammar</h2>
      <div className="CFG_FlexBox_Div">
        <div className="CFG_Button_Div">
          <button onClick={onAdd}>Add</button>
          <button onClick={onRemove}>Remove</button>
          <button onClick={clear}>Clear</button>
          <input
            type="text"
            value={lang}
            onChange={(e) => handleLang(e)}
          />
        </div>
        <div className="CFG_Rules">
          {Array.from({ length: count }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={text[index]}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyPress(e)}
              onClick={() => onTextClick(index)}
            />
          ))}
        </div>
        <h1>{currentTextIndex}</h1>
        <h1>{lang}</h1>
      </div>
      <div className="outputBox">
        {renderOutputs()}
      </div>
    </>
  );
}

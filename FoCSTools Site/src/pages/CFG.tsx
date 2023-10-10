import { useState } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(count - 1);

  function onTextClick(index: number) {
    setCurrentTextIndex(index);
    //console.log(currentTextIndex);
  }

  function onAdd() {
    setCurrentTextIndex(count);
    setCount(count + 1);
    const newText = [...text, ""];
    setText(newText);
  }

  function onRemove() {
    if (count > 0) {
      setCount(count - 1);
      text.splice(currentTextIndex, 1);
      setCurrentTextIndex(count - 2);
    }

    //const newText = [...text];
    //newText.pop();
    //setText(newText);
  }

  function clear() {
    const newText = [""];
    setText(newText);
    setCount(0);
    setCurrentTextIndex(-1);
  }

  const onWrite = (index: number, value: string) => {
    const newText = [...text];
    newText[index] = value;
    setText(newText);
  }
  const handleKeyPress=(e: React.KeyboardEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    if(e.key==='|') onAdd();
    else if(e.key==='Backspace'&& !value)onRemove();
  }
  const handleChange=(index: number, e:React.FormEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    if(value[value.length-1]==='|')return
    onWrite(index,value)
  }
  return (
    <>
      <h2 className="CFG_Text_Div">Create a Context Free Grammar</h2>
      <div className="CFG_FlexBox_Div">
        <div className="CFG_Button_Div">
          <button onClick={onAdd}>Add</button>
          <button onClick={onRemove}>Remove</button>
          <button onClick={clear}>Clear</button>
        </div>
        <div className="CFG_Rules">
          {Array.from({ length: count }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={text[index]}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyPress(e)}
              // onChange={(e) => onWrite(index, e.target.value)}
              onClick={() => onTextClick(index)}
            />
          ))}
        </div>
        <h1>{text}</h1>
        <h1>{currentTextIndex}</h1>
      </div>
    </>
  );
}

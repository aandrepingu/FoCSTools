import { useState } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string[]>([]);

  function onAdd() {
    setCount(count + 1);
    const newText = [...text, ""];
    setText(newText);
  }

  function onRemove() {
    if (count > 0) {
      setCount(count - 1);
    }
    const newText = [...text];
    newText.pop();
    setText(newText);
  }

  const onWrite = (index: number, value: string) => {
    const newText = [...text];
    newText[index] = value;
    setText(newText);
  };

  return (
    <>
      <h2 className="CFG_Text_Div">Create a Context Free Grammar</h2>
      <div className="CFG_FlexBox_Div">
        <div className="CFG_Button_Div">
          <button onClick={onAdd}>Add</button>
          <button onClick={onRemove}>Remove</button>
        </div>
        <div>
          {Array.from({ length: count }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={text[index]}
              onChange={(e) => onWrite(index, e.target.value)}
            />
          ))}
        </div>
        <h1>{text}</h1>
      </div>
    </>
  );
}

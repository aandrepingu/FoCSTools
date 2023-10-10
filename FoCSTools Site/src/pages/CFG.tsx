import { useState } from "react";
import "./CFG.css";

export default function CFG() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string[]>([]);

    function onAdd() {
      setCount(count+1);
      const newText = [...text, ''];
      setText(newText);
    }

    function onRemove() {
      if(count > 1){
        setCount(count-1);
      }
      const newText = [...text];
      newText.pop()
      setText(newText);
    }

    function clear(){
      const newText = [''];
      setText(newText);
      setCount(1);
    }

    const onWrite = (index: number, value: string) => {
        const newText = [...text];
        newText[index] = value;
        setText(newText);
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
              onChange={(e) => onWrite(index, e.target.value)}
            />
          ))}
        </div>
        <h1>{text}</h1>
      </div>
    </>
  );
}

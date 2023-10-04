import { useState } from "react";

export default function CFG() {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string[]>([]);

    function onAdd() {
      setCount(count+1);
      const newText = [...text, ''];
      setText(newText);
    }

    function onRemove() {
      setCount(count-1);
      const newText = [...text, ''];
      setText(newText);
    }

    const onWrite = (index: number, value: string) => {
        const newText = [...text];
        newText[index] = value;
        setText(newText);
    }

    return (
      <>
        <h2>Create a Context Free Grammar</h2>
        {Array.from({ length: count }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={text[index]}
            onChange={(e) => onWrite(index, e.target.value)}
          />
        ))}
        <div>
          <button onClick={onAdd}>Add Production</button>
          <button onClick={onRemove}>Remove Production</button>
        </div>
        <h1>{ text[1] }</h1>
      </>
    );
  }
  
import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(100);
  const [speechSynthesis] = useState(window.speechSynthesis);
  const [utterance] = useState(new SpeechSynthesisUtterance());
  const [switchButton, setSwitchButton] = useState(true);
  const [breakButton, setBreakButton] = useState(true);

  const handleStart = () => {
    speechSynthesis.cancel();
    setSwitchButton(true);
    if (breakButton) {
      utterance.text = text;
      utterance.rate = rate / 175;
      speechSynthesis.speak(utterance);
    } else {
      const words = text.split(" ");
      words.forEach((word) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = rate / 175;
        speechSynthesis.speak(utterance);
      });
    }
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setSwitchButton(false);
  };

  const handleResume = () => {
    speechSynthesis.resume();
    setSwitchButton(true);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <br />
      <div>Word Count: {text.trim() === "" ? 0 : text.split(" ").length}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={switchButton ? handlePause : handleResume}>
        {switchButton ? "Pause" : "Resume"}
      </button>
      <button onClick={() => setBreakButton(!breakButton)}>
        {breakButton ? "Break On" : "Break Off"}
      </button>
      
      <br />
      Speech Rate:
      <input
        type="range"
        min={30}
        max={200}
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      {rate} words per minute
    </div>
  );
};

export default App;

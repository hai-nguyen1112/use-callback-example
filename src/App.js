import React, { useState, useCallback } from 'react';

// Generates random colours any time it's called
const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

// The type of the props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// A memoized button with a random background colour
const Button = React.memo((props: ButtonProps) =>
  <button onClick={props.onClick} style={{background: randomColour()}}>
    {props.children}
  </button>
)

// Keeps track of all created functions during the app's life
const functions: Set<any> = new Set();

const App = () => {
  const [delta, setDelta] = useState(1);
  const [counter, setCounter] = useState(0);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);

  const incrementCounter = useCallback(() => setCounter(counter => counter + delta), [delta]);

  // Register the functions so we can count them
  functions.add(incrementDelta);
  functions.add(incrementCounter);

  return (
    <div>
      <div>Delta is {delta}</div>
      <div>Counter is {counter}</div>
      <br/>
      <div>
        <Button onClick={incrementDelta}>Increase Delta</Button>
        &nbsp;
        <Button onClick={incrementCounter}>Increase Counter</Button>
      </div>
      <br/>
      <div> Newly Created Functions: {functions.size - 2} </div>
    </div>
  )
}

export default App;

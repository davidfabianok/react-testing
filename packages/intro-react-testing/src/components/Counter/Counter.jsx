import {useState} from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((count += 1));
  }
  function decrement() {
    setCount((count -= 1));
  }

  return (
    <div className="counter">
      <h5>Counter: {count}</h5>
      <button name="decrement" onClick={decrement}>
        Decrement
      </button>
      <button name="increment" onClick={increment}>
        Increment
      </button>
    </div>
  );
}

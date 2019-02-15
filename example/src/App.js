import React, { useState } from 'react'

import ExampleComponent from 'use-browser-history'

function App() {
  const [count, setCount] = useState( 0 );

  return (
    <div>
      <p>Hello! Count: {count}</p>
      <button onClick={() => setCount( count + 1 )}>Increment</button>
    </div>
  );
}

export default App;


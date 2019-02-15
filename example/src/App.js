import React, { useState } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import useBrowserHistory from 'use-browser-history'

function Modal({ isOpen, onClose, onOpen }) {
  const [handleBack] = useBrowserHistory( 'my-modal', isOpen, onClose, onOpen );

  if ( !isOpen )
    return null;

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={handleBack} />

      <div className="modal-box">
        <p>Hello!</p>
        <button onClick={handleBack}>Close modal</button>
      </div>
    </div>
  )
}

function Page({ title }) {
  const [isOpen, setIsOpen] = useState( false );

  return (
    <div>
      <p>{title}</p>
      <button onClick={() => setIsOpen( true )}>Open modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen( false )}
        onOpen={() => setIsOpen( true )}
      />

      <ul>
        <li><Link to="/">Page one</Link></li>
        <li><Link to="/two">Page two</Link></li>
        <li><Link to="/three">Page three</Link></li>
      </ul>
    </div>
  );
}

const PageOne = () => <Page title="Page one" />;
const PageTwo = () => <Page title="Page two" />;
const PageThree = () => <Page title="Page three" />;

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={PageOne} />
        <Route path="/two" component={PageTwo} />
        <Route path="/three" component={PageThree} />
      </div>
    </Router>
  )
}

export default App;

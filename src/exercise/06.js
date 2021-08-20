// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import '../text-styles.css';

function UsernameForm({onSubmitUsername}) {
  const usernameInputRef = React.useRef(null); // he doesn't say "null" but React docs do it?

  const [error, setError] = React.useState(null);

  const handleSubmit = (event) => { // <-- event is actually a `SyntheticEvent`, created by React for us for performance reasons
    event.preventDefault();
    // ^ by default, when form is submitted, browser will make a GET request to current URL
    //   with query parameters (?username=blah) then --> a full-page refresh

    // console.log('Synthetic:', event);
    // console.log('Native:', event.nativeEvent);
    // console.log('Target:', event.target, event.target.elements);
    // console.dir(event.target);

    // const userName = event.target.elements.usernameInput.value; <-- commenting this out for EC1
    // const userName = event.target.username.value;
    // ^ obvs using array index here is a bad idea i.e. target[0]
    //   also looks like target.elements.xyz and target.xyz are same thing?
    //   he prefers using the ID and also with `elements.` bit
    onSubmitUsername(usernameEc3 ? usernameEc3 : usernameInputRef.current.value);
  };

  // nfn↵
  const handleChange = ({target}) => {
    const isLowerCase = target.value === target.value.toLowerCase();
    setError(isLowerCase ? null : 'Username must be lower case');
  }

  const [usernameEc3, setUsernameEc3] = React.useState("");

  const handleChangeEc3 = ({target}) => {
    // target.value = target.value.toLowerCase(); <-- this is not the "idiomatic" way to do this in React
    setUsernameEc3(target.value.toLowerCase());
  }

  // htmlFor is for screen readers, and so that clicking on label focuses the input
  // note that the HTML ATTRIBUTE is `for` but the DOM PROPERTY NAME is `htmlFor`
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username (Original):</label>
        <input onChange={handleChange} ref={usernameInputRef} name="username" id="usernameInput" type="text" />
        <div id="usernameError" className="error" role="alert">{error}</div>
      </div>
      <div>
        <label htmlFor="usernameInputEc3">Username (EC3):</label>
        <input onChange={handleChangeEc3} value={usernameEc3} name="usernameEc3" id="usernameInputEc3" type="text" />
      </div>
      <button type="submit" disabled={Boolean(error)}>Submit</button>
      {/* I did this coz it's cool but he didn't 😿 <button type="submit" disabled={!!error}>Submit</button> */}
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App;

/*

  If you remove the onChange handler for EC3 you get a warning:
    Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
      at ...
  This is because there's no way for React to set the state now.
  You can mark the element with `readOnly` attribute and the warning goes away, tho.
  Or you can set the `defaultValue={stateVar}` prop.

*/

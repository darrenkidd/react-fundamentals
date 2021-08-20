// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react';
import PropTypes from 'prop-types';
import '../box-styles.css';

// ----------------------------------------------------------------------------

const smallBox = (
  <div
    className="box box--small"
    style={{backgroundColor: 'lightblue', fontStyle: 'italic'}}
  >
    small lightblue box
  </div>
);

const mediumBox = (
  <div
    className="box box--medium"
    style={{backgroundColor: 'pink', fontStyle: 'italic'}}
  >
    medium pink box
  </div>
);

const largeBox = (
  <div
    className="box box--large"
    style={{backgroundColor: 'orange', fontStyle: 'italic'}}
  >
    large orange box
  </div>
);

function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
    </div>
  )
}

// ----------------------------------------------------------------------------

const BoxEc1 = ({className = "", style, ...otherProps}) => (
  <div
    className={`box ${className}`.trim()}
    style={{
      fontStyle: "italic",
      /* defaults are left of spread */ ...style /* overrides are right of spread */,
    }}
    {...otherProps}
  />
);

const AppEc1 = () => (
  <>
    <BoxEc1 className="box--small" style={{backgroundColor: 'lightblue'}}>
      small lightblue box
    </BoxEc1>
    <BoxEc1 className="box--medium" style={{backgroundColor: 'pink'}}>
      medium pink box
    </BoxEc1>
    <BoxEc1 className="box--large" style={{backgroundColor: 'orange'}}>
      large orange box
    </BoxEc1>
    <BoxEc1>
      sizeless colourless box
    </BoxEc1>
  </>
);

// ----------------------------------------------------------------------------

const BoxEc2 = ({size, className = '', style, children, ...otherProps}) => {
  const sizeClassName = size ? `box--${size}` : ""; /* he did it this way... */
  return <div
    className={`box ${className} ${sizeClassName}` /* ...and WE will always override */}
    style={{
      fontStyle: 'italic',
      ...style, /* ...let THEM override */
    }}
    {...otherProps} /* if you remove 'children' above, it gets gathered in otherProps and would achieve same effect here (see BoxEc1) */
  >
    {children}
  </div>
};

BoxEc2.propTypes = {
  size: PropTypes.oneOf(['small','medium', 'large']).isRequired,
};

BoxEc2.defaultProps = {
  size: 'large', // this causes the last box below to not throw errors - but not strictly needed anymore due to way we assign `sizeClassName` in ternary above
};

const AppEc2 = () => (
  <>
    <BoxEc2 size="small" style={{backgroundColor: 'lightblue'}} id="small-box">
      small lightblue box
    </BoxEc2>
    <BoxEc2 size="medium" style={{backgroundColor: 'pink'}}>
      medium pink box
    </BoxEc2>
    <BoxEc2 size="large" style={{backgroundColor: 'orange'}}>
      large orange box
    </BoxEc2>
    <BoxEc2 size="big">
      bad-sized colourless box
    </BoxEc2>
    <BoxEc2 className="polka-dot">
      default-sized polka-dot box
    </BoxEc2>
  </>
);

// ----------------------------------------------------------------------------

export default AppEc2;

/*

> $0.className
"box box--small"
> $0.style
CSSStyleDeclaration {0: "background-color", 1: "font-style", ...}

They already used "className" because "class" is a tricky word due to many languages
treating it as a special keyword.

NOTE: WE ARE DEALING WITH "DOM PROPERTIES" NOT "HTML ATTRIBUTES". They are different.
One points to / manipulates the other.

*/

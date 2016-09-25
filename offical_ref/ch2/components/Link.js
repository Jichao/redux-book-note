import React,{PropTypes} from 'react';

const Link = ({onClick, active, children}) => {
  if (active) {
    return (<span className="filterBtn">{children}</span>);
  } else {
    return (
      <a className="filterBtn" href="javascript:void(0)" onClick={e => {
        e.preventDefault();
        onClick();
        }}>
      {children}
      </a>
    )
  }
};

Link.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;

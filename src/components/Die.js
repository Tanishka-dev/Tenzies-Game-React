import React from "react";
import "./index.css";
export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#F29432" : "#ffffff",
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

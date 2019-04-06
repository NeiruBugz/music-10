import React from "react";
import block from "bem-cn";
import "./index.scss";

const b = block("button");

class Button extends React.Component {
  render () {
    const { track, artist } = this.props;

    return (
      <button className={b()} type="submit">
        <p className={b("artist")}>{artist}</p>
        <p className={b("track")}>
          {track}
        </p>
      </button>
    );
  }
}

export default Button;
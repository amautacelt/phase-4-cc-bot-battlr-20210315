import React, { Component } from "react";
import BotCard from "../components/BotCard";

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          Collection of all bots
          {this.props.bots.map((bot) => (
            <BotCard 
              key={bot.id}
              bot={bot}
              handleCast={this.props.handleCast}
              handleDischarge={this.props.handleDischarge}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BotCollection;

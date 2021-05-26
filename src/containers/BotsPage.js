import React, { Component } from "react";
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';


class BotsPage extends Component {
  state = {
    bots: [],
  }

  componentDidMount() {
    fetch('http://localhost:6001/bots')
      .then(res => res.json())
      .then((bots) => this.setState( { bots } ));
  }


  setBotCast = (bot, cast) => {
    fetch(`http://localhost:6001/bots/${bot.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({cast})
    })
    .then(() => {
      const newBot = { ...bot, cast };
      this.setState({
        bots: this.state.bots.map((b) => (b === bot ? newBot : b)),
      });
    })
    .catch(err => console.error(err));
  };


  castBot = (bot) => {
    this.setBotCast(bot, true)
  }


  releaseBot = (bot) => {
    this.setBotCast(bot, false)
  }


  dischargeBot = (bot) => {
    fetch(`http://localhost:6001/bots/${bot.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(() => 
        this.setState({
          bots: [...this.state.bots.filter((b) => b !== bot)]
        })
      )
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <YourBotArmy 
          handleCast={this.releaseBot} 
          handleDischarge={this.dischargeBot}
          bots={this.state.bots.filter((bot) => bot.cast)}
        />

        <BotCollection 
          handleCast={this.castBot} 
          handleDischarge={this.dischargeBot}
          bots={this.state.bots}
        />
      </div>

    )
  }
}

export default BotsPage;

import React, { Component } from "react";
import logo from "./logo.svg";
import PoemContentForm from "./PoemContentForm.js";
import PoemContent from "./PoemContent.js";
import "./App.css";
import { CSSTransitionGroup } from "react-transition-group";
import { Button } from "reactbulma";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { editable: true, hasPoem: false };
    this.toggleEditable = this.toggleEditable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditable() {
    this.setState({ editable: !this.state.editable });
    window.scrollTo(0, 0);
  }

  handleSubmit(event) {
    this.setState({
      title: event.title,
      content: event.content,
      editable: !this.state.editable,
      hasPoem: true
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-title-container">
            <h1 className="App-title">Reverse Poem</h1>
            <h2 className="App-tagline">
              Create your reverse poem and have fun!
            </h2>
          </div>
        </header>
        <div className="App-bg" />
        <CSSTransitionGroup
          transitionName="poem"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="App-content">
            {this.state.editable
              ? this.renderEditMode()
              : this.renderViewMode()}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
  renderViewMode() {
    return (
      <div className="App-content-container">
        <Button onClick={this.toggleEditable} className="App-edit">
          Edit
        </Button>
        <PoemContent {...this.state} />
      </div>
    );
  }
  renderEditMode() {
    return (
      <div className="App-content-container">
        <PoemContentForm
          {...this.state}
          onToggleEditable={this.toggleEditable}
          onUpdate={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;

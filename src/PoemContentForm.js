import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactbulma";

class PoemContetForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { title: props.title || "", content: props.content || "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onUpdate(this.state);
  }

  render() {
    const { title, content } = this.state;
    const { onToggleEditable, hasPoem } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="poem-title-input"
          type="text"
          placeholder="Type your poem title here"
          value={title}
          onChange={this.handleTitleChange}
          required={true}
        />
        <textarea
          className="poem-content-input"
          value={content}
          placeholder="Type your poem"
          onChange={this.handleContentChange}
          required={true}
          rows={15}
        />
        <br />
        <Button className="is-primary" type="submit" value="Submit">
          Done!
        </Button>
        {hasPoem ? (
          <Button onClick={this.props.onToggleEditable}>Cancel</Button>
        ) : (
          ""
        )}
      </form>
    );
  }
}

PoemContetForm.propTypes = {
  onToggleEditable: PropTypes.func,
  hasPoem: PropTypes.bool
};

export default PoemContetForm;

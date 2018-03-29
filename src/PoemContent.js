import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { CSSTransitionGroup } from "react-transition-group";
import { Button } from "reactbulma";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

class PoemContent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { reverse: false };
    this.toggleReverse = this.toggleReverse.bind(this);
    this.reverseContent = this.reverseContent.bind(this);
  }

  toggleReverse() {
    this.setState({ reverse: !this.state.reverse });
    scroller.scrollTo("poem-container", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }

  reverseContent(content) {
    const contentArr = content.split(/\r\n|\r|\n/g);
    let reverseContent = "";
    let i = contentArr.length - 1;
    while (!_.isUndefined(contentArr[i])) {
      reverseContent += contentArr[i] + "<br />";
      i--;
    }
    return reverseContent;
  }

  render() {
    const { title, content } = this.props;
    const classname = this.state.reverse
      ? "poem-content-effect turn"
      : "poem-content-effect";
    return (
      <CSSTransitionGroup
        transitionName="poem"
        transitionAppear={true}
        transitionAppearTimeout={500}
      >
        <div className="poem-container">
          <h1 className="poem-title">{title}</h1>
          <div className="poem-content-container">
            <div className={classname}>
              <div
                className="poem-content reverse"
                dangerouslySetInnerHTML={{
                  __html: this.reverseContent(content)
                }}
              />
              <div
                className="poem-content"
                dangerouslySetInnerHTML={{
                  __html: content
                }}
              />
            </div>
          </div>
          <Button className="is-link poem-reverse" onClick={this.toggleReverse}>
            Reverse It
          </Button>
        </div>
      </CSSTransitionGroup>
    );
  }
}

PoemContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default PoemContent;

import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { connect } from "react-redux";
import { addChart, setPosition } from "../../actions/widgetActions";
import "./App.css";

class DnD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "inherit",
      mouseDown: false,
      offsetX: 0,
      offsetY: 0,
      pageX: 0,
      pageY: 0
    };
  }

  componentDidMount = () => {
    document.addEventListener("mousemove", e => {
      const documentElem = this.transporter;

      const { mouseDown, offsetX, offsetY, pageX, pageY } = this.state;

      if (mouseDown) {
        documentElem.style.left = offsetX + (e.pageX - pageX) + "px";
        documentElem.style.top = offsetY + (e.pageY - pageY) + "px";
      }
    });
  };

  onMouseUp = () => {
    const { position, widget } = this.props;

    this.setState({ mouseDown: false });

    const documentElem = this.transporter;

    documentElem.style.zIndex = 99;
    const positioning = widget.position;

    positioning.positionLeft[position] = documentElem.style.left;
    positioning.positionTop[position] = documentElem.style.top;
    positioning.zIndex = widget.position.zIndex.map((e, index) => {
      return index === position ? widget.position.zIndex.length : 0;
    });

    this.props.dispatch(setPosition(positioning));
  };

  onMouseDown = e => {
    const documentElem = this.transporter;

    documentElem.style.zIndex = 100;
    const offsetX = documentElem.offsetLeft;

    const offsetY = documentElem.offsetTop;

    this.setState({
      mouseDown: true,
      offsetX,
      offsetY,
      pageX: e.pageX,
      pageY: e.pageY
    });
  };

  getTransporter = node => {
    this.transporter = node;
  };

  renderCloseBtn = closable => {
    if (closable)
      return (
        <div className="closeButton" onClick={this.handleClose}>
          <i className="fa fa-trash" />
        </div>
      );
  };
  handleClose = () => {
    const { widget, index } = this.props;

    const list = widget.chartList;
    list.splice(index);
    this.props.dispatch(addChart(list));
    this.setState({ display: "none" });
  };

  render() {
    const { name, closable, position, children, widget, width } = this.props;

    return (
      <div
        className="content"
        ref={this.getTransporter}
        style={{
          width: width,
          display: this.state.display,
          left: widget.position.positionLeft[position],
          top: widget.position.positionTop[position],
          zIndex: widget.position.zIndex[position]
        }}
      >
        <div
          className="name"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          {name}
          {this.renderCloseBtn(closable)}
        </div>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  widget: state.widget
});

export default connect(mapStateToProps)(DnD);

/* Global define */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.ReactUI = factory(root.React);
  }
}(this, function (React) {

  'use strict';

  var hasOwnProperty = {}.hasOwnProperty;

  var extend = function (dest, src) {
    for (var key in src) {
      if (hasOwnProperty.call(src, key)) {
        dest[key] = src[key];
      }
    }
  };

  var dom = React.DOM;

  var Button = React.createClass({

    render: function () {

      var props = {
        className: 'react-ui-button'
      };

      var buttonProps = {
        disabled: this.props.disabled || false,
        title: this.props.title,
        onClick: this.onClick || void 0
      };

      return dom.div(props,
        dom.button(buttonProps, this.props.children)
      );

    },

    onClick: function (event) {
      event.preventDefault();
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(event);
      }
    }

  });

  var Checkbox = React.createClass({

    getInitialState: function () {
      return { checked: this.props.checked || false };
    },

    render: function () {
      var props = {
        className: 'react-ui-checkbox',
      };

      var checkboxProps = {
        disabled: this.props.disabled || false,
        title: this.props.title,
        onClick: this.onClick || void 0
      };

      if (this.state.checked === true) {
        checkboxProps.className += ' is-checked';
      }

      return dom.div(props, dom.button(checkboxProps));
    },

    onClick: function (event) {
      event.preventDefault();

      this.setState({
        'checked': !this.state.checked
      });

      if (this.state.checked === false && typeof this.props.onCheck === 'function') {
        this.props.onCheck(event);
      }

      if (this.state.checked === true && typeof this.props.onUncheck === 'function') {
        this.props.onUncheck(event);
      }
    }

  });

  return {
    Button: Button,
    Checkbox: Checkbox
  };

}));

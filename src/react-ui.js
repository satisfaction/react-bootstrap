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
        className: 'react-ui-button',
        disabled: this.props.disabled || false,
        title: this.props.title,
        onClick: this.props.onClick || void 0
      };

      return dom.button(props, this.props.children);
    },

    onClick: function (event) {
      event.preventDefault();
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(event);
      }
    }

  });

  return {
    Button: Button
  };

}));

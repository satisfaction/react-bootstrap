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

  // var extend = function (obj, props) {
  //   for (var key in props) {
  //     if (hasOwnProperty.call(props, key)) {
  //       obj[key] = props[key];
  //     }
  //   }
  // };
  //
  // var filter = function (obj, attrs) {
  //   var filtered = {};
  //
  //   if (typeof attrs === 'string') {
  //     attrs = [attrs];
  //   }
  //
  //   attrs.forEach(function (key) {
  //     filtered[key] = obj[key];
  //   });
  // };

  var dom = React.DOM;

  var Button = React.createClass({

    render: function () {

      var props = {
        className: (this.props.className ? this.props.ClassName + ' ' : '') + 'react-ui react-ui-button'
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
        this.props.onClick();
      }
    }

  });

  var Checkbox = React.createClass({

    getInitialState: function () {
      return { checked: this.props.checked || false };
    },

    render: function () {

      var props = {
        className: (this.props.className ? this.props.ClassName + ' ' : '') + 'react-ui react-ui-checkbox'
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

  var TextInput = React.createClass({

    getInitialState: function () {
      return {
        value: this.props.value || ''
      };
    },

    render: function () {

      var props = {
        className: (this.props.className ? this.props.ClassName + ' ' : '') + 'react-ui react-ui-text-input'
      };

      var buttonProps = {
        type: 'text',
        disabled: this.props.disabled || false,
        title: this.props.title,
        placeholder: this.props.placeholder,
        onChange: (this.onChange || void 0),
        onKeyUp: (this.onKeyUp || void 0)
      };

      return dom.div(props,
        dom.input(buttonProps, this.props.children)
      );

    },

    onChange: function (event) {
      this.setState({
        value: this.getDOMNode().querySelector('input').value
      });

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    },

    onKeyUp: function (event) {
      this.setState({
        value: this.getDOMNode().querySelector('input').value
      });

      if (this.props.onKeyUp) {
        var filteredEvent = {
          value: this.state.value
        };

        this.props.onKeyUp(event);
      }
    }

  });

  var Select = React.createClass({

    getInitialState: function () {
      return {
        value: this.props.value || void 0,
        collapsed: true
      };
    },

    render: function () {
      var props = {
        className: (this.props.className ? this.props.ClassName + ' ' : '') + 'react-ui react-ui-select',
        onClick: this.onClick
      };

      if (this.state.collapsed) {
        props.className += ' react-ui-select-is-collapsed';
      }

      var inputProps = {
        onKeyPress: this.onKeyPress,
        type: 'text',
        value: this.getLabel()
      };

      return dom.div(props, [
        dom.div({
          className: 'react-ui-select-input'
        }, [
          dom.input(inputProps, this.getLabel()),
        ]),
        dom.div({
          className: 'react-ui-select-caret'
        }),
        dom.ul(null, this.renderOptions())
      ]);
    },

    getLabel: function () {
      var label, option;
      for (var i = 0, len = this.props.options.length; i < len; i++) {
        option = this.props.options[i];
        if (option.value == this.state.value) {
          label = option.label;
          break;
        }
      }
      return label || '';
    },

    onClick: function (event) {
      this.setState({ collapsed: !this.state.collapsed });
    },

    onKeyPress: function (event) {
      event.preventDefault();
    },

    onOptionClick: function (value) {
      this.setState({ value: value });
      if (this.options.onChange) {
        this.options.onChange(this.state.value);
      }
    },

    renderOptions: function () {
      return this.props.options.map(function (option, key) {
        var props = {
          key: key,
          onClick: function () {
            this.onOptionClick(option.value);
          }.bind(this)
        };

        if (option.value === this.state.value) {
          props.className = 'react-ui-select-option-is-selected';
        }

        return dom.li(props, option.label);

      }.bind(this));
    }

  });

  return {
    Button: Button,
    Checkbox: Checkbox,
    Select: Select,
    TextInput: TextInput
  };

}));

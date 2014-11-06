/** @jsx React.DOM */
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

  var Button = React.createClass({displayName: 'Button',

    render: function () {
      var className = (this.props.className ? this.props.className + ' ' : '') +
        'react-ui react-ui-button';

      return (
        React.DOM.div({className: className}, 
          React.DOM.button({title: this.props.title, onClick: this.onClick, disabled: this.props.disabled}, 
            this.props.children
          )
        )
      );
    },

    onClick: function (event) {
      event.preventDefault();
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(event);
      }
    }

  });

  var Checkbox = React.createClass({displayName: 'Checkbox',

    render: function () {
      var className = (this.props.className ? this.props.ClassName + ' ' : '') +
        'react-ui react-ui-checkbox';

      if (this.props.checked === true) {
        className += ' react-ui-is-checked';
      }

      return (
        React.DOM.div({className: className}, 
          React.DOM.button({title: this.props.title, 
            onClick: this.onClick, 
            disabled: this.props.disabled})
        )
      );
    },

    onClick: function (event) {
      this.props.checked = !this.props.checked

      if (this.props.checked === false &&
        typeof this.props.onCheck === 'function') {
        this.props.onCheck(event);
      }

      if (this.props.checked === true &&
        typeof this.props.onUncheck === 'function') {
        this.props.onUncheck(event);
      }
    }

  });

  var Select = React.createClass({displayName: 'Select',

    getInitialState: function () {
      return {
        value: this.props.value || void 0,
        collapsed: true
      };
    },

    render: function () {
      var className = (this.props.className ? this.props.className + ' ' : '') +
        'react-ui react-ui-select';

      if (this.state.collapsed) {
        className += ' react-ui-is-collapsed';
      }

      return (
        React.DOM.div({className: className}, 
          React.DOM.div({onClick: this.onClick}, 
            React.DOM.label(null, this.getLabel()), 
            React.DOM.span(null), 
            React.DOM.input({type: "text", onKeyPress: this.onKeyPress})
          ), 
          React.DOM.ul(null, 
            this.renderOptions()
          )
        )
      );
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
      if (this.props.onChange) {
        setTimeout(function () {
          this.props.onChange(this.state.value);
        }.bind(this));
      }
    },

    renderOptions: function () {
      return this.props.options.map(function (option, i) {
        var className = option.value === this.state.value ? 'react-ui-is-selected' : '';

        var onClick = function () {
          this.onOptionClick(option.value);
        }.bind(this);

        return (
          React.DOM.li({key: i, className: className, onClick: onClick}, option.text)
        );
      }.bind(this));
    }

  });

  var RadioButton = React.createClass({displayName: 'RadioButton',

    render: function () {
      var className = (this.props.className ? this.props.className + ' ' : '') +
        'react-ui react-ui-radio-button';

      return (
        React.DOM.div({className: className}, 
          this.renderOptions()
        )
      );
    },

    onOptionClick: function (value) {
      this.props.value = value;

      if (this.props.onChange) {
        setTimeout(function () {
          this.props.onChange(this.props.value);
        }.bind(this));
      }
    },

    renderOptions: function () {
      return this.props.options.map(function (option, i) {

        var className = 'react-ui-radio-button-option'
        className += (option.value === this.props.value ? ' react-ui-is-selected' : '');

        var onClick = function () {
          this.onOptionClick(option.value);
        }.bind(this);

        return (
          React.DOM.li({key: i, className: className, onClick: onClick}, 
            React.DOM.div({className: "react-ui-radio-button-button"}), 
            React.DOM.span({className: "react-ui-radio-button-text"}, option.text)
          )
        );
      }.bind(this));
    }

  });

  var TextInput = React.createClass({displayName: 'TextInput',

    getInitialState: function () {
      return {
        value: this.props.value || ''
      };
    },

    render: function () {
      var className = (this.props.className ? this.props.ClassName + ' ' : '') +
        'react-ui react-ui-text-input';

      var errorMessage = this.validate();

      if (errorMessage) {
        className += ' react-ui-is-invalid';
      }

      return (
        React.DOM.div({className: className}, 
          React.DOM.input({type: "text", 
            title: this.props.title, 
            placeholder: this.props.placeholder, 
            onKeyUp: this.props.onKeyUp, 
            onChange: this.onChange, 
            disabled: this.props.disabled, 
            value: this.state.value})
        )
      );
    },

    onChange: function (event) {
      this.setState({
        value: this.getDOMNode().querySelector('input').value
      });

      if (this.props.onChange) {
        // Wait for the `state` to change
        // TODO: Is this the best way to do this?
        setTimeout(function () {
          this.props.onChange(event, this.state, this.props);
        }.bind(this), 1);
      }
    },

    validate: function () {
      if (this.state.value && typeof this.props.validate === 'function') {
        return this.props.validate(this.state);
      }
    }

  });

  React.DOM.Button = Button;

  return {
    Button: Button,
    Checkbox: Checkbox,
    RadioButton: RadioButton,
    Select: Select,
    TextInput: TextInput
  };

}));

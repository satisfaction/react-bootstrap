/** @jsx React.DOM */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.Bootstrap = factory(root.React);
  }
}(this, function (React) {

  'use strict';

  var join = function () {
    return arguments[0].join(' ').trim();
  };

  var Button = React.createClass({displayName: 'Button',

    render: function () {
      var className = join(['btn', this.props.className || 'btn-default']);

      return (
        React.DOM.button({type: "button", className: className, title: this.props.title, onClick: this.onClick, disabled: this.props.disabled}, 
          this.props.children
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

    getInitialState: function () {
      return {
        checked: this.props.checked || false
      }
    },

    render: function () {
      var className, label;

      className = join([this.props.className, 'react-ui', 'react-ui-checkbox']);
      label = this.props.children ? React.DOM.span({className: "react-ui-checkbox-label"}, this.props.children) : '';

      return (
        React.DOM.div({className: className, onClick: this.onClick}, 
          React.DOM.i({className: join(['fa', (this.state.checked === true ? 'fa-check-square-o' : 'fa-square-o')])}), 
          label
        )
      );
    },

    onClick: function (event) {
      event.preventDefault();

      if (this.props.disabled) {
        return;
      }

      this.setState({checked: !this.state.checked});

      setTimeout(function () {
        if (this.state.checked === true && typeof this.props.onCheck === 'function') {
          this.props.onCheck(event);
        }

        if (this.state.checked === false && typeof this.props.onUncheck === 'function') {
          this.props.onUncheck(event);
        }
      }.bind(this))
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
      var className = join([this.props.className, 'react-ui', 'react-ui-select']);

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
      var className = join([this.props.className, 'react-ui', 'react-ui-radio-button']);

      return (
        React.DOM.div({className: className}, 
          this.renderOptions()
        )
      );
    },

    onOptionClick: function (value) {
      this.setProps({value: value});

      if (typeof this.props.onChange === 'function') {
        setTimeout(function () {
          this.props.onChange(this.props.value);
        }.bind(this));
      }
    },

    renderOptions: function () {
      return this.props.options.map(function (option, i) {
        var className, onClick;

        className = 'react-ui-radio-button-option'

        onClick = function () {
          this.onOptionClick(option.value);
        }.bind(this);

        return (
          React.DOM.li({key: i, className: className, onClick: onClick}, 
            React.DOM.i({className: join(['react-ui-radio-button-disc', 'fa', (this.props.value == option.value ? 'fa-dot-circle-o' : 'fa-circle-o')])}), 
            React.DOM.span({className: "react-ui-radio-button-text"}, option.text)
          )
        );
      }.bind(this));
    }

  });

  var TextInput = React.createClass({displayName: 'TextInput',

    getInitialState: function () {
      return {
        value: this.props.value
      };
    },

    render: function () {
      var className, errorMessage;

      className = join([this.props.className, 'react-ui', 'react-ui-text-input']);

      errorMessage = this.validate();

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
            value: this.props.value})
        )
      );
    },

    onChange: function (event) {
      this.setState({value: this.getDOMNode().querySelector('input').value});

      if (typeof this.props.onChange === 'function') {
        setTimeout(function () {
          this.props.onChange(event, this.state.value);
        }.bind(this));
      }
    },

    validate: function () {
      if (this.state.value && typeof this.props.validate === 'function') {
        return this.props.validate(this.state.value);
      }
    }

  });

  return {
    Button: Button,
    Checkbox: Checkbox,
    RadioButton: RadioButton,
    Select: Select,
    TextInput: TextInput
  };

}));

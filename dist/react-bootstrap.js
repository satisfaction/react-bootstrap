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
      var className, type;

      className = join(['btn', this.props.className || 'btn-default']);
      type = this.props.type || 'button';

      return (
        React.DOM.button({type: type, 
          id: this.props.id, 
          className: className, 
          title: this.props.title, 
          onClick: this.onClick, 
          disabled: this.props.disabled}, 
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
      return (
        React.DOM.label(null, 
          React.DOM.input({
            type: "checkbox", 
            id: this.props.id, 
            checked: this.props.checked, 
            className: this.props.className, 
            disabled: this.props.disabled, 
            name: this.props.name, 
            onChange: this.onChange, 
            value: this.props.value}), " ", 
          this.props.label || this.props.children || ''
        )
      );
    },

    onChange: function (event) {
      var checkbox = event.target;
      if (checkbox.checked === true && typeof this.props.onCheck === 'function') {
        this.props.onCheck(event);
      }

      if (checkbox.checked === false && typeof this.props.onUncheck === 'function') {
        this.props.onUncheck(event);
      }
    }

  });

  var Form = React.createClass({displayName: 'Form',

    render: function () {
      return (
        React.DOM.form({id: this.props.id, className: this.props.className, role: "form"}, 
          this.props.children
        )
      );
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
      return (
        React.DOM.label(null, 
          React.DOM.input({
            type: "radio", 
            id: this.props.id, 
            checked: this.props.checked, 
            className: this.props.className, 
            disabled: this.props.disabled, 
            name: this.props.name, 
            onChange: this.onChange, 
            value: this.props.value}), " ", 
          this.props.label || this.props.children || ''
        )
      );
    }

  });

  var TextInput = React.createClass({displayName: 'TextInput',

    getInitialState: function () {
      return {
        id: this.props.id || 'text-input-' + Date.now(),
        value: this.props.value
      };
    },

    render: function () {
      var className, errorMessage, type;

      className = this.props.className;
      type = this.props.type || 'text';

      if (this.props.validate) {
        errorMessage = this.validate();
        if (!errorMessage) {
          className += ' has-success'
        } else {
          className += ' has-error';
        }
      }

      return (
        React.DOM.div({className: className}, 
          this.renderLabel(), 
          React.DOM.input({type: type, 
            id: this.state.id, 
            className: "form-control", 
            disabled: this.props.disabled, 
            onChange: this.onChange, 
            onKeyUp: this.props.onKeyUp, 
            placeholder: this.props.placeholder, 
            title: this.props.title, 
            value: this.props.value}), 
          this.renderHelp()
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

    renderLabel: function () {
      if (!this.props.label) return '';
      return (React.DOM.label({htmlFor: this.state.id}, this.props.label));
    },

    renderHelp: function () {
      if (!this.props.helpBlock) return '';
      return (React.DOM.span({className: "help-block"}, this.props.helpBlock));
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
    Form: Form,
    RadioButton: RadioButton,
    Select: Select,
    TextInput: TextInput
  };

}));

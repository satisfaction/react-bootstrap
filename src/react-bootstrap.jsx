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

  var Button = React.createClass({

    render: function () {
      var className, type;

      className = join(['btn', this.props.className || 'btn-default']);
      type = this.props.type || 'button';

      return (
        <button type={type}
          id={this.props.id}
          className={className}
          title={this.props.title}
          onClick={this.onClick}
          disabled={this.props.disabled}>
          {this.props.children}
        </button>
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
      return {
        checked: this.props.checked || false
      }
    },

    render: function () {
      return (
        <label>
          <input type="checkbox" onChange={this.onChange} />&nbsp;
          {this.props.label || this.props.children || ''}
        </label>
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

  var Form = React.createClass({

    render: function () {
      return (
        <form id={this.props.id} className={this.props.className} role="form">
          {this.props.children}
        </form>
      );
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
      var className = join([this.props.className, 'react-ui', 'react-ui-select']);

      if (this.state.collapsed) {
        className += ' react-ui-is-collapsed';
      }

      return (
        <div className={className}>
          <div onClick={this.onClick}>
            <label>{this.getLabel()}</label>
            <span></span>
            <input type="text" onKeyPress={this.onKeyPress} />
          </div>
          <ul>
            {this.renderOptions()}
          </ul>
        </div>
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
          <li key={i} className={className} onClick={onClick}>{option.text}</li>
        );
      }.bind(this));
    }

  });

  var RadioButton = React.createClass({

    render: function () {
      var className = join([this.props.className, 'react-ui', 'react-ui-radio-button']);

      return (
        <div className={className}>
          {this.renderOptions()}
        </div>
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
          <li key={i} className={className} onClick={onClick}>
            <i className={join(['react-ui-radio-button-disc', 'fa', (this.props.value == option.value ? 'fa-dot-circle-o' : 'fa-circle-o')])} />
            <span className="react-ui-radio-button-text">{option.text}</span>
          </li>
        );
      }.bind(this));
    }

  });

  var TextInput = React.createClass({

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
        <div className={className}>
          {this.renderLabel()}
          <input type={type}
            id={this.state.id}
            className='form-control'
            onKeyUp={this.props.onKeyUp}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            title={this.props.title}
            value={this.props.value} />
          {this.renderHelp()}
        </div>
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
      return (<label htmlFor={this.state.id}>{this.props.label}</label>);
    },

    renderHelp: function () {
      if (!this.props.helpBlock) return '';
      return (<span className="help-block">{this.props.helpBlock}</span>);
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

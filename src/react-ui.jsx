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

  var Button = React.createClass({

    render: function () {
      var className = (this.props.className ? this.props.className + ' ' : '') + 'react-ui react-ui-button';

      return (
        <div className={className}>
          <button title={this.props.title} onClick={this.onClick} disabled={this.props.disabled}>
            {this.props.children}
          </button>
        </div>
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
      var className = (this.props.className ? this.props.ClassName + ' ' : '') + 'react-ui react-ui-checkbox';

      return (
        <div className={className} onClick={this.onClick}>
          <i className={'fa ' + (this.state.checked === true ? 'fa-check-square-o' : 'fa-square-o')} />
        </div>
      );
    },

    onClick: function (event) {
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

  var Select = React.createClass({

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
      var className = (this.props.className ? this.props.className + ' ' : '') +
        'react-ui react-ui-radio-button';

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
            <i className={'react-ui-radio-button-disc fa ' + (option.value === this.props.value ? 'fa-dot-circle-o' : 'fa-circle-o')} />
            <span className="react-ui-radio-button-text">{option.text}</span>
          </li>
        );
      }.bind(this));
    }

  });

  var TextInput = React.createClass({

    render: function () {
      var className, errorMessage;

      className = (this.props.className ? this.props.ClassName + ' ' : '') +
        'react-ui react-ui-text-input';

      errorMessage = this.validate();

      if (errorMessage) {
        className += ' react-ui-is-invalid';
      }

      return (
        <div className={className}>
          <input type="text"
            title={this.props.title}
            placeholder={this.props.placeholder}
            onKeyUp={this.props.onKeyUp}
            onChange={this.onChange}
            disabled={this.props.disabled}
            value={this.props.value} />
        </div>
      );
    },

    onChange: function (event) {
      this.setProps({value: this.getDOMNode().querySelector('input').value});

      if (typeof this.props.onChange === 'function') {
        setTimeout(function () {
          this.props.onChange(event, this.props.value);
        }.bind(this));
      }
    },

    validate: function () {
      if (this.props.value && typeof this.props.validate === 'function') {
        return this.props.validate(this.value);
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

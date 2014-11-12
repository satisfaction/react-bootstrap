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

  if (!Object.assign) {
    Object.assign = function (target, source) {
      var key;

      for (key in source) {
        if (source.hasOwnProperty(key)) target[key] = source[key];
      }

      return target;
    };
  }

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
      };
    },

    render: function () {
      var props = Object.assign({}, this.props);

      props.type = 'checkbox';

      // Remove conflicting properties
      props.label = null;
      props.children = null;

      return (
        <div className="checkbox">
          <label>
            <Input {...props} />
            {this.props.label || this.props.children || ''}
          </label>
        </div>
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
      var props = Object.assign({}, this.props);

      props.type = 'radio';

      // Remove conflicting properties
      props.label = null;
      props.children = null;

      return (
        <div className="radio">
          <label>
            <Input {...props} />
            {this.props.label || this.props.children || ''}
          </label>
        </div>
      );
    }

  });

  var Input = React.createClass({
    render: function () {
      var props = Object.assign({}, this.props);

      props.type = this.props.type || 'text';

      if (['text', 'email', 'password'].indexOf(props.type) > -1) {
        props.className = join([this.props.className, 'form-control']);
      }

      return (
        <input {...props} />
      );
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

      var props = Object.assign({}, this.props);

      props.className = '' + this.props.className;

      if (this.props.validate) {
        errorMessage = this.validate();
        if (!errorMessage) {
          props.className += ' has-success';
        } else {
          props.className += ' has-error';
        }
      }

      return (
        <div>
          {this.renderLabel()}
          <Input {...props} />
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
    Input: Input,
    RadioButton: RadioButton,
    Select: Select,
    TextInput: TextInput
  };

}));

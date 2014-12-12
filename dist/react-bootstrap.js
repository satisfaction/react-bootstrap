var __slice = [].slice,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.Bootstrap = factory(root.React);
  }
})(this, function(React) {
  'use strict';
  var Button, Checkbox, ClassName, Form, Input, RadioButton, Select, TextInput, assign, buildHelpBlock, button, div, form, input, isArray, isFunction, isRegExp, label, li, p, span, _ref;
  _ref = React.DOM, button = _ref.button, div = _ref.div, form = _ref.form, input = _ref.input, label = _ref.label, li = _ref.li, p = _ref.p, span = _ref.span;

  /*
   * Utility functions
   */
  assign = function() {
    var dest, key, source, sources, target, val, _i, _len;
    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (target === 'undefined' || target === null) {
      throw new TypeError('Cannot convert argument to object');
    }
    dest = Object(target);
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      if (typeof source !== 'undefined' && source !== null) {
        for (key in source) {
          val = source[key];
          if (source.hasOwnProperty(key)) {
            dest[key] = val;
          }
        }
      }
    }
    return dest;
  };
  isArray = function(obj) {
    return typeof obj === 'object' && obj.constructor === Array;
  };
  isFunction = function(obj) {
    return typeof obj === 'function';
  };
  isRegExp = function(obj) {
    return typeof obj === 'object' && obj.constructor === RegExp;
  };

  /*
   * Helpers
   */
  buildHelpBlock = function(text) {
    if (!text) {
      return null;
    }
    return p({
      className: 'help-block'
    }, text);
  };
  ClassName = (function() {
    function ClassName(words) {
      this.words = words != null ? words : [];
      this.toString = __bind(this.toString, this);
      this.remove = __bind(this.remove, this);
      this.has = __bind(this.has, this);
      this.add = __bind(this.add, this);
      if (!isArray(this.words)) {
        this.words = this.words.split(' ');
      }
    }

    ClassName.prototype.add = function(word) {
      if (!word) {
        return;
      }
      this.words = this.words.concat(word.split(' '));
    };

    ClassName.prototype.has = function(criteria) {
      var exists, word, _i, _len, _ref1;
      exists = false;
      if (!criteria) {
        return exists;
      }
      if (isRegExp(criteria)) {
        _ref1 = this.words;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          word = _ref1[_i];
          if (criteria.test(word)) {
            exists = true;
          }
        }
      } else {
        exists = this.words.indexOf(criteria) > -1;
      }
      return exists;
    };

    ClassName.prototype.remove = function(word) {
      if (!word) {
        return;
      }
      if (this.words.indexOf(word) > -1) {
        this.words.splice(this.words.indexOf(word));
      }
    };

    ClassName.prototype.toString = function() {
      return this.words.join(' ').trim();
    };

    return ClassName;

  })();
  buildHelpBlock = function(text) {
    if (!text) {
      return null;
    }
    return p({
      className: 'help-block'
    }, text);
  };
  Button = React.createClass({
    render: function() {
      var className, props;
      props = assign({}, this.props, {
        type: 'button'
      });
      className = new ClassName([this.props.className, 'btn']);
      if (!className.has(/btn-(danger|default|info|link|primary|success|warning)/)) {
        className.add('btn-default');
      }
      props.className = className.toString();
      return button(props);
    }
  });
  Checkbox = React.createClass({
    getInitialState: function() {
      return {
        checked: this.props.checked || false
      };
    },
    render: function() {
      var className, props;
      props = assign({}, this.props, {
        children: null,
        label: null,
        type: 'checkbox'
      });
      className = new ClassName(props.className);
      if (className.has("" + props.type + "-inline")) {
        className.remove("" + props.type + "-inline");
        return label({
          className: "" + props.type + "-inline"
        }, [input(props), this.props.label || this.props.children || '']);
      } else {
        return div({
          className: props.type
        }, [label(null, [input(props), this.props.label || this.props.children || ''])]);
      }
    }
  });
  Form = React.createClass({
    render: function() {
      return form({
        id: this.props.id,
        className: this.props.className,
        role: 'form'
      }, this.props.children);
    }
  });
  Select = React.createClass({
    getInitialState: function() {
      return {
        collapsed: true,
        value: this.props.value || void 0
      };
    },
    render: function() {
      var className;
      className = new ClassName([this.props.className, 'react-ui', 'react-ui-select']);
      if (this.state.collapsed) {
        className.add('react-ui-is-collapsed');
      }
      return div({
        className: className.toString()
      }, [
        div({
          onClick: this.onClick
        }, [
          label(null, this.getLabel()), span(), Input({
            type: 'text',
            onKeyPress: this.onKeyPress
          })
        ]), ul(null, this.renderOptions())
      ]);
    },

    /*
     * Get's the selected option text
     */
    getLabel: function() {
      var i, len, option;
      if (!this.state.value) {
        return '';
      }
      i = 0;
      label = void 0;
      len = this.props.options.length;
      option = void 0;
      while (i < len) {
        option = this.props.options[i];
        if (option.value === this.state.value) {
          label = option.label;
          break;
        }
        i++;
      }
      return label || '';
    },
    onClick: function(event) {
      return this.setState({
        collapsed: !this.state.collapsed
      });
    },
    onKeyPress: function(event) {
      return event.preventDefault();
    },
    onOptionClick: function(value) {
      this.setState({
        value: value
      });
      return setTimeout((function(_this) {
        return function() {
          if (_this.props.onChange) {
            return _this.props.onChange(_this.state.value);
          }
        };
      })(this));
    },
    renderOptions: function() {
      return this.props.options.map((function(_this) {
        return function(option, i) {
          var className, onClick;
          className = option.value === _this.state.value ? 'react-ui-is-selected' : '';
          onClick = function() {
            _this.onOptionClick(option.value);
          };
          return li({
            key: i,
            className: className,
            onClick: onClick
          }, option.text);
        };
      })(this));
    }
  });
  RadioButton = React.createClass({
    getInitialState: function() {
      return {
        checked: this.props.checked || false
      };
    },
    render: function() {
      var className, props;
      props = assign({}, this.props, {
        children: null,
        label: null,
        type: 'radio'
      });
      className = new ClassName(props.className);
      if (className.has("" + props.type + "-inline")) {
        className.remove("" + props.type + "-inline");
        return label({
          className: "" + props.type + "-inline"
        }, [Input(props), this.props.label || this.props.children || '']);
      } else {
        return div({
          className: props.type
        }, [label(null, [input(props), this.props.label || this.props.children || '']), buildHelpBlock(props.help)]);
      }
    }
  });
  Input = React.createClass({
    render: function() {
      var className, inputTypes, props;
      props = assign({
        type: 'text'
      }, this.props);
      inputTypes = ['text', 'email', 'password'];
      className = new ClassName(props.className);
      if (inputTypes.indexOf(props.type) > -1) {
        className.add('form-control');
      }
      props.className = className.toString();
      return input(props);
    }
  });
  TextInput = React.createClass({
    getInitialState: function() {
      return {
        id: this.props.id || ("text-input-" + (Date.now())),
        value: this.props.value
      };
    },
    render: function() {
      var className, error, props;
      props = assign({
        ref: 'input'
      }, this.props);
      this._inputRef = props.ref;
      className = new ClassName(this.props.className);
      className.remove('form-group');
      if (this.props.validate) {
        className.add(((error = this.validate()) ? 'has-error' : 'has-success'));
      }
      props.className = className.toString();
      return div({
        className: 'form-group'
      }, [this.renderLabel(), Input(props), this.renderHelp()]);
    },
    onChange: function(event) {
      this.setState({
        value: this.refs[this._inputRef].value
      });
      if (isFunction(this.props.onChange)) {
        setTimeout(function() {
          return this.props.onChange(event);
        });
      }
    },
    renderLabel: function() {
      if (!this.props.label) {
        return null;
      }
      return label({
        htmlFor: this.state.id
      }, this.props.label);
    },
    renderHelp: function() {
      if (!this.props.helpBlock) {
        return null;
      }
      return span({
        className: 'help-block'
      }, this.props.helpBlock);
    },
    validate: function() {
      if (isFunction(this.props.validate)) {
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
});

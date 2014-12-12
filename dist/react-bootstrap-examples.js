
/*
 * -----------------------------------------------------------------------------
 * Button Options
 * -----------------------------------------------------------------------------
 */
var Button, Checkbox, Form, RadioButton, TextInput, btnStyle, div;

Button = Bootstrap.Button;

Checkbox = Bootstrap.Checkbox;

Form = Bootstrap.Form;

RadioButton = Bootstrap.RadioButton;

TextInput = Bootstrap.TextInput;

div = React.DOM.div;

btnStyle = {
  marginRight: '5px;'
};

React.renderComponent(div(null, [
  Button({
    style: btnStyle
  }, 'Default'), Button({
    className: 'btn-primary',
    style: btnStyle
  }, 'Primary'), Button({
    className: 'btn-success',
    style: btnStyle
  }, 'Success'), Button({
    className: 'btn-info',
    style: btnStyle
  }, 'Info'), Button({
    className: 'btn-warning',
    style: btnStyle
  }, 'Warning'), Button({
    className: 'btn-danger',
    style: btnStyle
  }, 'Danger'), Button({
    className: 'btn-link',
    style: btnStyle
  }, 'Link')
]), document.getElementById('button-options'));


/*
 * -----------------------------------------------------------------------------
 * Basic Form
 * -----------------------------------------------------------------------------
 */

React.renderComponent(Form(null, [
  TextInput({
    type: 'email',
    label: 'Email address',
    placeholder: 'Enter email',
    helpBlock: 'e.g. me@example.net'
  }), TextInput({
    type: 'password',
    label: 'Email address',
    placeholder: 'Password'
  }), Checkbox(null, 'Check me out!'), Button({
    type: 'submit'
  }, 'Submit')
]), document.getElementById('basic-form'));


/*
 * -----------------------------------------------------------------------------
 * Checkboxes and Radios
 * -----------------------------------------------------------------------------
 */

React.renderComponent(div(null, [
  div(null, Checkbox(null, 'Option one is this and that-be sure to include why it\'s great')), div(null, Checkbox({
    disabled: true
  }, 'Option two is disabled')), div(null, RadioButton({
    name: 'radioExample'
  }, 'Option one is this and that—be sure to include why it\'s great')), div(null, RadioButton({
    name: 'radioExample',
    disabled: true
  }, 'Option two is disabled'))
]), document.getElementById('checkboxes-and-radios'));

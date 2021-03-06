
/*
 * -----------------------------------------------------------------------------
 * Button Options
 * -----------------------------------------------------------------------------
 */
var Button, Checkbox, Form, RadioButton, TextInput, div;

Button = Bootstrap.Button;

Checkbox = Bootstrap.Checkbox;

Form = Bootstrap.Form;

RadioButton = Bootstrap.RadioButton;

TextInput = Bootstrap.TextInput;

div = React.DOM.div;

React.renderComponent(div(null, [
  Button(null, 'Default'), Button({
    className: 'btn-primary'
  }, 'Primary'), Button({
    className: 'btn-success'
  }, 'Success'), Button({
    className: 'btn-info'
  }, 'Info'), Button({
    className: 'btn-warning'
  }, 'Warning'), Button({
    className: 'btn-danger'
  }, 'Danger'), Button({
    className: 'btn-link'
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

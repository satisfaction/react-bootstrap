/** @jsx React.DOM */
// -----------------------------------------------------------------------------
// Button Options
// -----------------------------------------------------------------------------

var Button = Bootstrap.Button,
    Checkbox = Bootstrap.Checkbox,
    Form = Bootstrap.Form,
    RadioButton = Bootstrap.RadioButton,
    TextInput = Bootstrap.TextInput;

React.renderComponent((
    React.DOM.div(null, 
      Button(null, "Default"), " ", 
      Button({className: "btn-primary"}, "Primary"), " ", 
      Button({className: "btn-success"}, "Success"), " ", 
      Button({className: "btn-info"}, "Info"), " ", 
      Button({className: "btn-warning"}, "Warning"), " ", 
      Button({className: "btn-danger"}, "Danger"), " ", 
      Button({className: "btn-link"}, "Link")
    )
  ), document.getElementById('button-options'));

// -----------------------------------------------------------------------------
// Basic Form
// -----------------------------------------------------------------------------


React.renderComponent((
    Form(null, 
      TextInput({type: "email", label: "Email address", placeholder: "Enter email", helpBlock: "e.g. my-name@example.com"}), 
      TextInput({type: "password", label: "Password", placeholder: "Password"}), 
      Checkbox(null, "Check me out!"), 
      Button({type: "submit"}, "Submit")
    )
  ), document.getElementById('basic-form'));

// -----------------------------------------------------------------------------
// Checkboxes and Radios
// -----------------------------------------------------------------------------

React.renderComponent((
    React.DOM.div(null, 
      React.DOM.div(null, 
        Checkbox(null, "Option one is this and that—be sure to include why it's great")
      ), React.DOM.div(null, 
        Checkbox({disabled: "disabled"}, "Option two is disabled")
      ), React.DOM.div(null, 
        RadioButton({name: "radioExample"}, "Option one is this and that—be sure to include why it's great")
      ), React.DOM.div(null, 
        RadioButton({name: "radioExample", disabled: "disabled"}, "Option two is disabled")
      )
    )
  ), document.getElementById('checkboxes-and-radios'));

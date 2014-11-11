/** @jsx React.DOM */
// -----------------------------------------------------------------------------
// Button Options
// -----------------------------------------------------------------------------

var Button = Bootstrap.Button,
    Checkbox = Bootstrap.Checkbox,
    Form = Bootstrap.Form,
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
      React.DOM.div({className: "form-group"}, 
        TextInput({type: "email", label: "Email address", placeholder: "Enter email", helpBlock: "e.g. my-name@example.com"})
      ), 

      React.DOM.div({className: "form-group"}, 
        TextInput({type: "password", label: "Password", placeholder: "Password"})
      ), 

      React.DOM.div({className: "form-group"}, 
        Checkbox(null, "check me out!")
      ), 

      Button({type: "submit"}, "Submit")
    )
  ), document.getElementById('basic-form'));

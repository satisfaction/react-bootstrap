/** @jsx React.DOM */
// Button


function button1Click(event) {
  document.getElementById('button1-message').innerHTML = 'You clicked me!';
}

React.renderComponent(
  ReactUI.Button({onClick: button1Click}, "Click Me"),
  document.getElementById('button1-container')
);

React.renderComponent(
  ReactUI.Button({disabled: true}, "Click Me"),
  document.getElementById('button2-container')
);


// Checkbox


function onCheck() {
  document.getElementById('checkbox1-message').innerHTML = 'Check!';
}

function onUncheck() {
  document.getElementById('checkbox1-message').innerHTML = 'Uncheck!';
}

React.renderComponent(
  ReactUI.Checkbox({onCheck: onCheck, onUncheck: onUncheck}),
  document.getElementById('checkbox1-container')
);

React.renderComponent(
  React.DOM.div(null, 
     ReactUI.Checkbox({onCheck: onCheck, onUncheck: onUncheck, disabled: true}), 
     " ", 
     ReactUI.Checkbox({onCheck: onCheck, onUncheck: onUncheck, checked: true, disabled: true})
   ),
  document.getElementById('checkbox2-container')
);


// RadioButton

var options = [
  { value: 1, text: 'Option 1'},
  { value: 2, text: 'Option 2'},
  { value: 3, text: 'Option 3'}
];


React.renderComponent(
  ReactUI.RadioButton({options: options}),
  document.getElementById('radio-button1-container')
);

// TextInput


function onChange(event, value) {
  document.getElementById('text-input1-message').innerHTML = value;
}

React.renderComponent(
  ReactUI.TextInput({onChange: onChange, placeholder: "Type here"}),
  document.getElementById('text-input1-container')
);

React.renderComponent(
  ReactUI.TextInput({value: "I have a value"}),
  document.getElementById('text-input2-container')
);

React.renderComponent(
  ReactUI.TextInput({placeholder: "You can't type here", disabled: true}),
  document.getElementById('text-input3-container')
);

function validateTextInput(value) {
  if (!/^^(?:\(\d+\))?\s?[\d\-]+$/.test(value)) {
    return 'Invalid phone number';
  }
}

React.renderComponent(
  ReactUI.TextInput({placeholder: "Phone number", validate: validateTextInput}),
  document.getElementById('text-input4-container')
);

// Select
//
//
// var options = [
//   { value: 1, text: 'Option 1'},
//   { value: 2, text: 'Option 2'},
//   { value: 3, text: 'Option 3'}
// ];
//
// React.renderComponent(
//   <ReactUI.Select onChange={onChange} options={options} />,
//   document.querySelector('.select-container')
// );



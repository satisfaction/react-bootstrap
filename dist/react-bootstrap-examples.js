/** @jsx React.DOM */
// -----------------------------------------------------------------------------
// Button
// -----------------------------------------------------------------------------

var Button = Bootstrap.Button;

function onButtonClick(event) {
  document.getElementById('button1-message').innerHTML = 'You clicked me!';
}

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

// Checkbox
//
// function onCheck() {
//   document.getElementById('checkbox1-message').innerHTML = 'Check!';
// }
//
// function onUncheck() {
//   document.getElementById('checkbox1-message').innerHTML = 'Uncheck!';
// }
//
// React.renderComponent(
//   <ReactUI.Checkbox onCheck={onCheck} onUncheck={onUncheck} />,
//   document.getElementById('checkbox1-container')
// );
//
// React.renderComponent(
//   <div>
//      <ReactUI.Checkbox onCheck={onCheck} onUncheck={onUncheck} disabled/>
//      &nbsp;
//      <ReactUI.Checkbox onCheck={onCheck} onUncheck={onUncheck} checked disabled/>
//    </div>,
//   document.getElementById('checkbox2-container')
// );
//
//
// React.renderComponent(
//   <ReactUI.Checkbox>
//     I have a label
//   </ReactUI.Checkbox>,
//   document.getElementById('checkbox3-container')
// );
//
// // RadioButton
//
// var options = [
//   { value: 1, text: 'Option 1'},
//   { value: 2, text: 'Option 2'},
//   { value: 3, text: 'Option 3'}
// ];
//
//
// React.renderComponent(
//   <ReactUI.RadioButton options={options} />,
//   document.getElementById('radio-button1-container')
// );
//
// // TextInput
//
//
// function onChange(event, value) {
//   document.getElementById('text-input1-message').innerHTML = value;
// }
//
// React.renderComponent(
//   <ReactUI.TextInput onChange={onChange} placeholder="Type here" />,
//   document.getElementById('text-input1-container')
// );
//
// React.renderComponent(
//   <ReactUI.TextInput value="I have a value" />,
//   document.getElementById('text-input2-container')
// );
//
// React.renderComponent(
//   <ReactUI.TextInput placeholder="You can't type here" disabled />,
//   document.getElementById('text-input3-container')
// );
//
// function validateTextInput(value) {
//   if (!/^(?:\(\d+\)\s?)?[\d\-]+$/.test(value)) {
//     return 'Invalid phone number';
//   }
// }
//
// React.renderComponent(
//   <ReactUI.TextInput placeholder="Phone number" validate={validateTextInput} />,
//   document.getElementById('text-input4-container')
// );

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



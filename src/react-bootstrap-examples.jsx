// -----------------------------------------------------------------------------
// Button Options
// -----------------------------------------------------------------------------

var Button = Bootstrap.Button,
    Checkbox = Bootstrap.Checkbox,
    Form = Bootstrap.Form,
    RadioButton = Bootstrap.RadioButton,
    TextInput = Bootstrap.TextInput;

React.renderComponent((
    <div>
      <Button>Default</Button>&nbsp;
      <Button className="btn-primary">Primary</Button>&nbsp;
      <Button className="btn-success">Success</Button>&nbsp;
      <Button className="btn-info">Info</Button>&nbsp;
      <Button className="btn-warning">Warning</Button>&nbsp;
      <Button className="btn-danger">Danger</Button>&nbsp;
      <Button className="btn-link">Link</Button>
    </div>
  ), document.getElementById('button-options'));

// -----------------------------------------------------------------------------
// Basic Form
// -----------------------------------------------------------------------------


React.renderComponent((
    <Form>
      <TextInput type="email" label="Email address" placeholder="Enter email" helpBlock="e.g. my-name@example.com" />
      <TextInput type="password" label="Password" placeholder="Password" />
      <Checkbox>Check me out!</Checkbox>
      <Button type="submit">Submit</Button>
    </Form>
  ), document.getElementById('basic-form'));

// -----------------------------------------------------------------------------
// Checkboxes and Radios
// -----------------------------------------------------------------------------

React.renderComponent((
    <div>
      <div>
        <Checkbox>Option one is this and that—be sure to include why it's great</Checkbox>
      </div><div>
        <Checkbox disabled="disabled">Option two is disabled</Checkbox>
      </div><div>
        <RadioButton name="radioExample">Option one is this and that—be sure to include why it's great</RadioButton>
      </div><div>
        <RadioButton name="radioExample" disabled="disabled">Option two is disabled</RadioButton>
      </div>
    </div>
  ), document.getElementById('checkboxes-and-radios'));

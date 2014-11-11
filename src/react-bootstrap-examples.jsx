// -----------------------------------------------------------------------------
// Button Options
// -----------------------------------------------------------------------------

var Button = Bootstrap.Button,
    Checkbox = Bootstrap.Checkbox,
    Form = Bootstrap.Form,
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
      <div className='form-group'>
        <TextInput type="email" label="Email address" placeholder="Enter email" helpBlock="e.g. my-name@example.com" />
      </div>

      <div className='form-group'>
        <TextInput type="password" label="Password" placeholder="Password" />
      </div>

      <div className='form-group'>
        <Checkbox>check me out!</Checkbox>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  ), document.getElementById('basic-form'));

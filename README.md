# rails_errors

Very basic npm package to parse Rails errors and help building forms.
Works nicely with React Bootstrap.

## Installation

```
npm install --save rails_errors
```

## Usage

Assuming a JSON response like this:

```
{ "errors": { "some_field": ["is invalid"] } }
```

You can write code like this:

```
const railsErrors = new RailsErrors(jsonResponse.errors)

railsErrors.forField('some_field') // => "is invalid"

railsErrors.firstMessage // => "is invalid"

railsErrors.fields // => "some_field"
```

And write some React Bootstrap components with proper validation errors:

```
function MyInput({ label, name, railsErrors, ...props }) {
  const errorMsg = railsErrors.forField(name);
  
  return (
    <FormControl controlId={name} validationState={errorMsg && 'error'}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props}/>
      <HelpBlock>{errorMsg}</HelpBlock>
    </FormControl>
  );
}
```

## Future development

* Find out how to properly display the field name,
  so we can display full error messages.
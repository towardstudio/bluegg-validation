# Bluegg Validation

Simple form validation, using HTML5 shaped cowpaths.
[Here's a demo on Codepen](https://codepen.io/matthewbeta/pen/Rjymaa)

**Read the disclaimer file in the repo. Also: this is not a substitute for
server side validation - make sure you do that! Did I mention the disclaimer**

## How to

### Installation

Install it

```bash
npm install bluegg-validation --save
```

Then require it (or import it if your using Babel - I don't care)

```js
const validation = require('bluegg-validation');
```

### JS Usage

Either use the defaults:

```js
var validation = new Validation();
```

Or use the options:

```js
var validation = new Validation({
	form: '#myform',
	errorClass: 'wrong-idiot',
	fieldContainer: '.input-wrap'
});
```

### HTML Usage & Tips

Please first make a nice accessible and semantic form. If you just want the
default functionality, you can simply add a `data-validate` attribute to your
form element and off you go:

```html
<form action="somethingcool.php" method="post" data-validate>
  <!-- ... -->
```

### Validation

The validation uses the built-in browser validation. That is, if a field is
required, it will be invalid if its empty and if a field of a certain type it
will be invalid if it isn't filled in correctly. The browser uses a bunch of
different attributes to validate against. It will definitely (read disclaimer)
validate against these (and maybe some other stuff)
[all from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes):

#### required

This attribute specifies that the user must fill in a value before submitting a
form. It cannot be used when the type attribute is hidden, image, or a button
type (submit, reset, or button).

#### minlength & maxlength

If the value of the type attribute is text, email, search, password, tel, or
url, this attribute specifies the minimum/maximum number of characters (in
UTF-16 code units) that the user can enter. For other control types, it is
ignored. It can exceed the value of the size attribute. If it is not specified,
the user can enter an unlimited number of characters. Specifying a negative
number results in the default behaviour (i.e. the user can enter an unlimited
number of characters). The constraint is evaluated only when the value of the
attribute has been changed.

#### pattern

A regular expression that the control's value is checked against. The pattern
must match the entire value, not just some subset. Use the title attribute to
describe the pattern to help the user. This attribute applies when the value of
the type attribute is text, search, tel, url, email, or password, otherwise it
is ignored. The regular expression language is the same as JavaScript RegExp
algorithm, with the 'u' parameter that makes it treat the pattern as a sequence
of unicode code points. The pattern is not surrounded by forward slashes.

#### min & max

The minimum/maximum (numeric or date-time) value for this item, which must not
be greater/less than its maximum/minimum (max/min attribute) value.

#### Types

It will also uses the browsers default validation for `type="email"`,
`type="url"`, `type="number"`, etc... This can be a bit clunky but you can fill
in the gaps with the pattern attribute regex stuff.

### Error Messages

By default, the error messages are supplied by your browser. You can customise
the error messages for the field using `data-attributes` on the field. You have
2 options:

#### Required Error Messages

If the field is required this message will show if it is not filled in:

```html
<input type="text" name="text" id="text" class="form__field" data-error-required="This field is required" required>
```

#### Invalid Error Messages

This is the message that will show for any other reason. e.g. Its not a valid
email address:

```html
<input data-error-invalid="Please enter a valid email address" type="email" name="email" id="email" class="form__field">
```

#### Invalid and required

You can also add both kinds of message to the same input. Whicvh ever one is
appropriate will show up:

```html
<input data-error-required="This field is required" data-error-invalid="Please enter a valid url, including the http(s) protocol" type="url" name="url" id="url" class="form__field" required>
```

### JS Options

#### options.form

Type: `string` Default: `[data-validate]`

A css selector for your form (e.g. '`#form`', '`.my-form`',
'`[data-validate-me]`', etc ). This should be unique to the page.

#### options.errorClass

Type: `string` Default: `error`

A string of the classname you wanted added to the input element (or wrapper
element).

#### options.fieldContainer

Type: `string` Default: `null`

A css selector for a parent of the form field you want the error class added to.
The JS will go through all the parents until it finds it so make sure its
definitely a parent.

#### options.validateLive

Type: `boolean` Default: `true`

By default your form fields will be marked invalid as soon as you remove focus.
It will also re-validate on keyup, if the field has been marked invalid. This
makes your form look a bit slicker as as soon as the user makes it invalid or
correct the UI will update automatically. If you want to remove this, just pass
in `false` for this option

### Examples

#### Multiple forms with different settings

```js
const Validation = require('bluegg-validation');

var contactForm = new Validation({
	form: '#contactForm',
	errorClass: 'validation-error',
	fieldContainer: '.form__row'
});

var signupForm = new Validation({
	form: '#signupForm',
	errorClass: 'inline-error'
});
```

#### Inline messages

The HTML 5 validation messages only show up one at a time on submit. In most
cases, this is fine. However you might want to show inline messages as soon as a
field is invalid (and remove it as soon as its updated). This is also possible
with some tinkering.

First set up your field HTML with a parent container element, and/or a sibling
validation message like so (note the aria-live attribute):

```html
<div>
	<label for="email">Your email</label>
	<input type="email" name="email" id="email" data-error-invalid="Please enter a valid url, including the http(s) protocol">
	<span class="error-msg" aria-live="polite">data-error-invalid="Please enter a valid url, including the http(s) protocol"</span>
</div>
```

Then style it so the message is hidden by default but appears when the error
class is added to the parent, or to the form field:

```css
.error-msg {
	display: none;
	color: red;
}
/* with wrapper element */
.is-error > .error-msg {
	display: block;
}
/* or no wrapper element */
.is-error + .error-msg {
	display: block;
}
```

## Credits

Inspired by this
[blog post by Dave Rupert](https://daverupert.com/2017/11/happier-html5-forms/)
and my love of [Parsley JS](http://parsleyjs.org/), but not its love of
jQuery....

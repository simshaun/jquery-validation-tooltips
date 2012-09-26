# [jQuery Validation Tooltips][jqvt-homepage]

Provides an easy, configurable way of making validation errors appear as tooltips.

## About jQuery Validation Tooltips

jQuery Validation Tooltips is a plugin that sits on top of Jörn Zaefferer's [jQuery Validation][jqv] plugin.
It modifies the default error displaying functionality so that errors are displayed as tooltips.

## Demo

http://demos.envysphere.com/jq/validation-tooltips/

## Prerequisites

This plugin requires Jörn Zaefferer's [jQuery Validation][jqv] plugin.

## Installation

 1. Add the stylesheet (**jquery.validate.tooltips.css**)

        <link rel="stylesheet" href="jquery.validate.tooltips.css">
        
 2. Add the javascript (**jquery.validate.tooltips.js**)

        <script src="jquery.validate.tooltips.js"></script>

    You must link the javascript **after** Jörn Zaefferer's jQuery Validation plugin.

## Warnings

There aren't any *efficient* ways that I know of to automatically reposition tooltips 
when their corresponding form fields change position on screen. (e.g. because of a collapsible box)

To help alleviate this problem, there is `.reflow()` method that you can manually call any time
something causes the form fields to move.

    var $validator = $('#form').validator();

    // This is an example of something that may cause form elements to move:
    $("#box").slideDown('fast', function() {
      // This repositions the tooltips.
      // It must be called *after* the form elements are finished moving.
      $validator.reflow();
    });

## Configuration

The plugin is intended to be as simple as possible to integrate.
However, there are some options you can configure if desired:

### errorPosition [string]
Where to position tooltips relative to their associated form elements.

**Default value:** `r`

**Allowed values**

 - t
 - b
 - l  [as in **l**eft]
 - r
 - tl [as in **t**op-**l**eft]
 - tr
 - bl [as in **b**ottom-**l**eft]
 - br

**Example**

    $("#form").validate({ errorPosition: 'tr' });
    
The tooltip position may be configured for each form element by giving the form element
a `data-errorposition` attribute. This attribute accepts the same allowed values as shown above.

    <input type="text" name="name" id="name" data-errorposition="t">


### errorSpacing [object]
How much spacing is placed between an input and the tooltip.
Spacing is configured for each side of an input.

**Default value:** `{ top: 2, right: 3, bottom: 2, left: 3 }`

**Example:**

    $("#form").validate({
      errorSpacing: {
        top:    0,
        right:  5,
        bottom: 0,
        left:   5
      }
    });


## License

MIT/GPL


[jqvt-homepage]: http://envysphere.com/jquery-validation-tooltips-14/
[jqv]: http://bassistance.de/jquery-plugins/jquery-plugin-validation/
# CSS Dig for Chrome

- [Install CSS Dig for Chrome](https://chrome.google.com/webstore/detail/css-dig/lpnhmlhomomelfkcjnkcacofhmggjmco)
- [CSS Dig Home](http://cssdig.com)

This Chrome Extension looks for stylesheets and style blocks on the webpage it's run against and groups declarations together for easy inspection. For example, you can see how many colors are used and how often. This can help you consolidate your styles and help with refactors.

It works on most websites but there are some limitations.

1. <b><code>@import</code> :</b> CSS in <code>@import</code> is currently ignored.
1. Content Security Policies: In some situations CSS Dig has make AJAX calls to retrieve the contents of the CSS files. Sites with strict Content Security Policies can block them. For example, facebook.com and github.com.
1. <b><code>https</code> :</b> Sites using external <code>https</code> css links will fail to load in CSS Dig.
1. <b><code>@media</code> :</b> CSS Dig will show selected properites inside <code>@media</code> blocks but it will include the entire block. Not sure how best to address this.
1. On sites with lots of external stylesheets it may take a few seconds to collect all the CSS.

If the extension fails to complete check the Javascript Console to view any errors. I'm working on better error catching.

## Libraries Used

- [CSS Beautify](https://github.com/senchalabs/cssbeautify)
- [CSSOM](https://github.com/NV/CSSOM)
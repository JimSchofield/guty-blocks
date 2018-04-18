# guty-blocks

A build environment for [Gutenberg blocks](https://wordpress.org/gutenberg/handbook/block-api/) with a few example blocks.

## How to use the blocks

1. Install and activate the [Gutenberg plugin](https://WordPress.org/plugins/gutenberg/) inside of WordPress
2. Clone this project into the plugins folder of WordPress
3. Activate this plugin inside of WordPress
4. You now should have access to guty-blocks in the Gutenberg editor

## Current example blocks:

- Hello world - simple static block
- Media - Allows adding an image and text to the side
- Quote - a simple quote block
- Custom Gallery - A custom image gallery that you can add images, title, rearrange images, etc.  It uses [lightbox2](http://lokeshdhakar.com/projects/lightbox2/) by Lokesh Dhakar (MIT).
- Carousel - A simple carousel example
- Image hero - Includes a background, hero text, and a gradient overlay
- Recent posts - Uses WordPress API to fetch posts and include them in the block
- Block layout - Uses InnerBlock component to nest blocks into  blocks on the page (css)
- Prism code - A code formatter using [prismjs](http://prismjs.com/)
- React View - An example where a live react app is included in the view of the page.  In the editor posts are selected.  In the view, the react app will fetch those post ids and preview the post.
- Side by Side - A simple image next to text that is responsive.

## How to make blocks

Make sure you have installed and activated the [Gutenberg plugin](https://wordpress.org/plugins/gutenberg/) and this project plugin. You will need to have `npm` installed and configured correctly for your Operating System.

1. Run `npm install` within this project plugin's main directory.  
2. Duplicate any of the folders within the src folder and make sure to rename the js and css files to your new block name.  You will need to rename file names inside of the `src.js` file as well.
3. You will need to create an `index.php` file that loads your new block in the `blocks/[yourblockname]` folder after the block is built. You can follow the pattern in the example blocks inside of the blocks folder
4. Webpack looks for `*.js` files following this pattern: `./source/[yourblockname]/[yourblockname].src.js`.  If you do not include the `.src.js` suffix, Webpack will not consider it the main gutenberg block JS file.
5. Webpack also looks for `*.view.js` files to build files that may be called as a part of the view functionality, but are separate from the editor.

## How to build the block files

1. `npm run watch`  
Sets up a "watcher" that monitors files for changes to trigger a rebuild. Essentially the same as `npm run build` below, but continuous.
2. `npm run build`  
This command runs [Babel](https://babeljs.io/) to transpile modern JavaScript to something more browsers understand. It uses the [@WordPress/babel-plugin-makepot](https://www.npmjs.com/package/@wordpress/babel-plugin-makepot) Babel plugin to automatically extract all translatable strings from the JavaScript, and create a POT file for them (`guty-blocks-js.pot`). This `-js.pot` POT file is an intermediary step to internationlizing all strings for the plugin.  

## Internationlization (i18n) / Localization

### What is [internationalization](https://developer.wordpress.org/plugins/internationalization/) (i18n)?  
> Internationalization is the process of developing a plugin, so it can easily be translated into other languages. Internationalization is often abbreviated as i18n (because there are 18 letters between the letters i and n).

In WordPress, we use the gettext family of functions to make "literal strings" in our code available for translation. This is "internationalization."  

For example, a 404 page might have a hard-coded message that says "Oops! That page can’t be found." That literal string is not content coming from the database, and it can't easily be changed to another language by the site owner, without editing our code.  

However, to internationalize that string, we would wrap it in a gettext function, so that it is made available for translation.  

A simple example of how we might do this in WordPress PHP:
`<?php esc_html_e( 'Oops! That page can’t be found.', 'my-plugin-text-domain' ); ?>`

The Gutenberg team has taken those gettext functions, and made them available to JS as well, via the [@wordpress/i18n](https://www.npmjs.com/package/@wordpress/i18n#api) npm package. The same concepts from WordPress PHP can now be used in your Gutenblocks.  

Now let's assume we have a Gutenblock that has a literal string in it, that we need to make available for translation.

We would import the __() function into our block like so, `const { __ } = wp.i18n;`.

Then we would use that function to wrap a literal string that needs to be available for translation, like so, `title: __( 'Hello World!', 'my-plugin-text-domain' )`.  

We would then use a tool (of which there are many) to create a POT (Portable Object Template) file. This file contains the original strings (in English) from the plugin. It is sort of like a dictionary, containing all the known literal strings.  

### What is [localization](https://developer.wordpress.org/plugins/internationalization/localization/) (l10n)?  
> Localization describes the subsequent process of translating an internationalized plugin. Localization is abbreviated as l10n (because there are 10 letters between the l and the n).

Localization then, is when a translator provides translated versions of those literal string in another language.  

> Every translator will take the POT file and translate the msgstr sections into their own language. The result is a PO (Portable Object) file with the same format as a POT, but with translations and some specific headers. There is one PO file per language.

> From every translated PO file, an MO (Machine Object) file is built. These are machine-readable, binary files that the gettext functions actually use (they don’t care about .POT or .PO files), and are a “compiled” version of the PO file. The conversion is done using the msgfmt tool. In general, an application may use more than one large logical translatable module and a different MO file accordingly. A text domain is a handle of each module, which has a different MO file.

### How do we create the plugin's POT file?

Gutenberg's [internationalization](https://developer.wordpress.org/plugins/internationalization/) (i18n) and [localization](https://developer.wordpress.org/plugins/internationalization/localization/) (l10n) features, much like Gutenberg itself, are evolving quickly. The workflow for i18n/l10n may change, improve, and simplify as the project evolves.  

For the purposes of `guty-blocks`, we are using a combination of three methods to generate our plugin's final POT file.

First, the build process, either with `npm run watch` or `npm run build`, will use the [@WordPress/babel-plugin-makepot](https://www.npmjs.com/package/@wordpress/babel-plugin-makepot) Babel plugin, to automatically extract all translatable strings from the JavaScript, and create a POT file specifically for those JS strings (`guty-blocks-js.pot`).

Second, the build process provides the command `npm run pot-to-php` to generate a PHP file, `guty-blocks-js-translations.php`, containing the JS strings from `guty-blocks-js.pot`, via [@wordpress/i18n's](https://www.npmjs.com/package/@wordpress/i18n) [pot-to-php](https://www.npmjs.com/package/@wordpress/i18n#build) script.   

Third, the build process provides the command `npm run makepot`* to utilize [WP-CLI's](https://wp-cli.org/#installing) [`wp i18n make-pot`](https://github.com/wp-cli/i18n-command) command, to build a final POT file, `guty-blocks.pot`, that contains all the strings from both JS and PHP. `guty-blocks.pot` is the final POT file, the one used for our plugin's text domain, and is the one that any localized PO/MO files should be built from.

***NOTE:** `npm run makepot` requires that you have [WP-CLI](https://wp-cli.org/#installing) installed and configured properly for your project. The [i18n command](https://github.com/wp-cli/i18n-command) is slated for future inclusion as a bundled WP-CLI command, but as of WP-CLI v 1.5.0, it is still an add-on command that must be installed separately. Refer to the i18n command's [installation instructions](https://github.com/wp-cli/i18n-command#installing).

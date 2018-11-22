<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_quote_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/quote-editor-script',
		plugins_url( 'quote.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor'  )
  );
  wp_enqueue_style(
	  'guty-blocks/quote-editor-style',
	  plugins_url( 'quote.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_quote_editor_assets' );

function guty_blocks_quote_assets() {
	wp_enqueue_style(
		'guty-blocks/quote-style',
		plugins_url( 'quote.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_quote_assets' );


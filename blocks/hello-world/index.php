<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_hello_world_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/hello-world-editor-script',
		plugins_url( 'hello-world.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
  );
  wp_enqueue_style(
	  'guty-blocks/hello-world-editor-style',
	  plugins_url( 'hello-world.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_hello_world_editor_assets' );

function guty_blocks_hello_world_assets() {
	wp_enqueue_style(
		'guty-blocks/hello-world-style',
		plugins_url( 'hello-world.view.css', __FILE__ ),
	    array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_hello_world_assets' );


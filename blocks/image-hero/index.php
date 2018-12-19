<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
MEDIA BLOCK
-------------- */

function guty_blocks_image_hero_editor_assets() {
	wp_enqueue_script(
		'guty-blocks/image-hero-editor-script',
		plugins_url( 'image-hero.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor'  )
  );
  wp_enqueue_style(
	  'guty-blocks/image-hero-editor-style',
	  plugins_url( 'image-hero.editor.css', __FILE__ ),
	  array( 'wp-edit-blocks' )
  );
}
add_action( 'enqueue_block_editor_assets', 'guty_blocks_image_hero_editor_assets' );

function guty_blocks_image_hero_assets() {
	wp_enqueue_style(
		'guty-blocks/image-hero-style',
		plugins_url( 'image-hero.view.css', __FILE__ ),
	    array( 'wp-edit-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'guty_blocks_image_hero_assets' );


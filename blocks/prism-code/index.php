<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/* --------------
Prism editor block
-------------- */

function gutenberg_prism_code_block() {
    wp_register_script(
        'guty-blocks/prism-code-editor-script',
		plugins_url( 'prism-code.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );
    wp_register_style(
        'guty-blocks/prism-code-editor-style',
	  	plugins_url( 'prism-code.view.css', __FILE__ ),
	  	array( 'wp-edit-blocks' )
    );

    register_block_type( 'guty-blocks/prism-code', array(
        'editor_script' => 'guty-blocks/prism-code-editor-script',
        'editor_style'  => 'guty-blocks/prism-code-editor-style',
        'style'  => 'guty-blocks/prism-code-editor-style',
    ) );
}
add_action( 'init', 'gutenberg_prism_code_block' );
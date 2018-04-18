/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import './hello-world.editor.css';
import './hello-world.view.scss';

registerBlockType('guty-blocks/hello-world', {
    title: __( 'Hello World!', 'guty-blocks' ),
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
    },

    // The editor "render" function
    edit(props) {
        const { className } = props;

        return (
            <div className={className}>
                <h1>{ __( 'Hello World!', 'guty-blocks' ) }</h1>
            </div>
        );
    },

    // The save "render" function
    save(props) {
        const { className } = props;

        return (
            <div className={className}>
                <h1>{ __( 'Hello World!', 'guty-blocks' ) }</h1>
            </div>
        );
    }

});

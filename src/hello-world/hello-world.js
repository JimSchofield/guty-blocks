import './hello-world.editor.css';
import './hello-world.view.css';

const {
    registerBlockType
} = wp.blocks;

registerBlockType('guty-blocks/hello-world', {
    title: 'Hello World!',
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
    },

    // The editor "render" function
    edit(props) {
        const { className } = props;

        return (
            <div className={className}>
                <h1>Hello World!</h1>
            </div>
        );
    },

    // The save "render" function
    save(props) {
        const { className } = props;

        return (
            <div className={className}>
                <h1>Hello World!</h1>
            </div>
        );
    }

});
import './react-view.editor.css';
import './react-view.view.scss';

const {
    registerBlockType
} = wp.blocks;

registerBlockType('guty-blocks/react-view', {
    title: 'React View Test',
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
            <div className={className} id={'live-react'}>
                <h1>react should render here</h1>
            </div>
        );
    }

});
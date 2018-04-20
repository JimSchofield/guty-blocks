import './react-view.editor.css';
import './react-view.view.scss';

import Editor from './components/Editor.jsx'

const {
    registerBlockType,
} = wp.blocks;

registerBlockType('guty-blocks/react-view', {
    title: 'React View Test',
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        selectedPostIds: {
            type: 'array',
            default: []
        },
    },

    // The editor "render" function
    edit(props) {
        const {
            className,
            setAttributes,
            attributes: {
                selectedPostIds,
                posts
            }
        } = props;

        function togglePost( postId ) {
            const index = selectedPostIds.indexOf(postId);
            if (index === -1) {
                setAttributes({ 
                    selectedPostIds: [ ...selectedPostIds, postId ]
                });
            } else {
                setAttributes({
                    selectedPostIds: selectedPostIds.filter((el, i) => i !== index),
                })
            }
        }

        return (
            <div 
                className={className} 
                id={'live-react'}
                data-post-ids={ JSON.stringify( selectedPostIds ) }
                >
                <Editor 
                    selectedPostIds={selectedPostIds}
                    togglePost={togglePost}
                    />
            </div>
        );
    },

    // The save "render" function
    save(props) {
        const { 
            className,
            attributes: { selectedPostIds }
        } = props;

        return (
            <div 
                className={className} 
                id={'live-react'}
                data-post-ids={ JSON.stringify( selectedPostIds ) }
                >
                Javascript must be enabled to view this block.
            </div>
        );
    }

});
import './media-block-editor.css';

const { registerBlockType, Editable, InspectorControls } = wp.blocks;

registerBlockType('guty-blocks/media-block', {
    title: 'Media Item Block',
    icon: 'smiley',
    category: 'common',

    attributes: {
        content: {
            type: 'string',
            default: 'Editable block content...',
        },
    },

    // Defines the block within the editor.
    edit(props) {

        var content = props.attributes.content;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }

        return ([
            !!focus && (
                <InspectorControls key="controls">
                    <p>Testing inspector!</p>
                </InspectorControls>
            ),
            <div className={props.className}>
                <Editable
                    key="editable"
                    tagName="p"
                    onChange={onChangeContent}
                    value={content}
                    focus={props.focus}
                    onFocus={props.setFocus}
                />
            </div>
        ]);
    },

    // Defines the saved block.
    save(props) {
        return (
            <div className={props.className}>
                <p> {props.attributes.content} </p>
            </div>);
    }

});
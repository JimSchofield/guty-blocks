import './media-block.editor.css';
import './media-block.view.css';

const {
    registerBlockType, 
} = wp.blocks;

const {
    RichText, // Editable field
    InspectorControls, // allows us to add controls on the sidebar
    MediaUpload // allows us to upload images
} = wp.editor

registerBlockType('guty-blocks/media-block', {
    title: 'Media Item Block',
    icon: 'smiley',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
            default: 'Editable block content...',
        },
        imageUrl: {
            type: 'string',
            default: null
        }
    },

    // The editor "render" function
    edit(props) {  

        let { content, imageUrl, focus, isSelected } = props.attributes;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }

        function setImage(image) {
            console.log(image);
            props.setAttributes({ imageUrl: image.url })
        }


        // If an image isn't selected show the upload button
        // otherwise, show the image
        let imageSide = null;
        if (imageUrl) {
            imageSide = <img src={imageUrl} alt="" />;
        } else {
            imageSide = <MediaUpload
                type="image"
                onSelect={setImage}
                render={({ open }) => (
                    <button onClick={open}>
                        Open Media Library
                    </button>
                    )}
                />
        }

        // Actual elements being rendered
        return ([
            isSelected && (
                <InspectorControls key="controls">
                    <p>This is where some style options can be presented for your block!</p>
                </InspectorControls>
            ),
            <div className={props.className}>
                <div class="left">
                    {imageSide}
                </div>
                <div class="right">
                    <RichText
                        tagName="p"
                        onChange={onChangeContent}
                        value={content}
                    />
                </div>
            </div>
        ]);
    },

    // The save "render" function
    save(props) {
        return (
            <div className={props.className}>
                <div class="left">
                    <img src={props.attributes.imageUrl} alt="" />
                </div>
                <div class="right">
                    <p>{props.attributes.content}</p>
                </div>  
            </div>
            );
    }

});
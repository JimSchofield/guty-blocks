import './media-block.editor.css';
import './media-block.view.css';

const {
    registerBlockType,
    Editable,
    InspectorControls,
    MediaUpload
} = wp.blocks;

registerBlockType('guty-blocks/media-block', {
    title: 'Media Item Block',
    icon: 'smiley',
    category: 'common',

    attributes: {
        content: {
            type: 'string',
            default: 'Editable block content...',
        },
        imageUrl: {
            type: 'string',
            default: null
        }
    },

    // Defines the block within the editor.
    edit(props) {

        let { content, imageUrl } = props.attributes;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }

        function setImage(image) {
            console.log(imageUrl);
            props.setAttributes({ imageUrl: image.url })
        }

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

        return ([
            !!focus && (
                <InspectorControls key="controls">
                    <p>This is where some style options can be presented for your block!</p>
                </InspectorControls>
            ),
            <div className={props.className}>
                <div class="left">
                    {imageSide}
                </div>
                <div class="right">
                    <Editable
                        key="editable"
                        tagName="p"
                        onChange={onChangeContent}
                        value={content}
                        focus={props.focus}
                        onFocus={props.setFocus}
                    />
                </div>
            </div>
        ]);
    },

    // Defines the saved block.
    save(props) {
        return (
            <div className={props.className}>
                <div class="left">
                    <img src={props.attributes.imageUrl} alt="" />
                </div>
                <div class="right">
                    <p> {props.attributes.content} </p>
                </div>
            </div>);
    }

});
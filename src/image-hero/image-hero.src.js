import './image-hero.editor.css';
import './image-hero.view.css';

const {
    registerBlockType,
    Editable, // Text field - will be replaced by RichText in future updates
    InspectorControls, // allows us to add controls on the sidebar
    MediaUpload, // allows us to upload images
    ColorPalette, // prebuilt component that allows color picking in inspector controls
} = wp.blocks;

registerBlockType('guty-blocks/image-hero', {
    title: 'Image Hero Block',
    icon: 'format-image',
    category: 'common',

    // Somewhat like setting initial state in a react app
    attributes: { 
        content: {
            type: 'string',
            default: 'Editable block content...',
        },
        imageUrl: {
            type: 'string',
            default: null
        },
        textColor: {
            type: 'string',
            default: 'white'
        },
        gradientColor: {
            type: 'string',
            default: null
        }
    },

    // The editor "render" function
    edit(props) {

        let { focus } = props;
        let { content, imageUrl, textColor, gradientColor } = props.attributes;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }
        function onChangeImage(imgObject) {
            props.setAttributes({ imageUrl: imgObject.url });
        }
        function onChangeGradientColor(color) {
            props.setAttributes({ gradientColor: color });
        }
        function onChangeTextColor(color) {
            props.setAttributes({ textColor: color });
        }

        // Actual elements being rendered
        return ([
            !!focus && (
                <InspectorControls key="controls">
                    <MediaUpload
                        type="image"
                        onSelect={onChangeImage}
                        render={({ open }) => (
                            <button onClick={open}>
                                Select a background image
                            </button>
                        )}
                    /><br /><br />
                    <span>Select text color:</span>
                    <ColorPalette
                        value={textColor}
                        onChange={onChangeTextColor}
                    />
                    <br /><br />
                    <span>Select a gradient color:</span>
                    <ColorPalette
                        value={gradientColor}
                        onChange={onChangeGradientColor}
                    />
                    <br /><br />
                </InspectorControls>
            ),
            <div className={props.className} style={{ backgroundImage: `url(${imageUrl})` }}>
                <div 
                    className={`overlay`}
                    style={{
                        background: gradientColor,
                        opacity: '.3'
                    }}    
                ></div>
                <Editable
                    key="editable"
                    tagName="h1"
                    onChange={onChangeContent}
                    value={content}
                    focus={props.focus}
                    onFocus={props.setFocus}
                    style={{
                        color: textColor
                    }}
                />
            </div>
        ]);
    },

    // The save "render" function
    save(props) {
        let { className } = props;
        let { content, imageUrl, gradientColor, textColor } = props.attributes;

        return (
            <div className={className} style={{ backgroundImage: `url(${imageUrl})` }}>
                <div 
                    className={`overlay`} //Note to self... `${props.className}` was undefined here. Bug?
                    style={{
                        background: gradientColor,
                        opacity: '.3'
                    }}    
                ></div>
                <h1 style={{ color: textColor }}>{content}</h1>
            </div>
        );
    }

});
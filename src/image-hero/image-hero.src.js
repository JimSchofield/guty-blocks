import './image-hero.editor.css';
import './image-hero.view.css';

const {
    registerBlockType,
    AlignmentToolbar, //prebuild alignment button component that we put in block controls for this block
    RichText,
    InspectorControls, // allows us to add controls on the sidebar
    BlockControls, //component that appears right above block when it is selected
    MediaUpload, // allows us to upload images
    ColorPalette, // prebuilt component that allows color picking in inspector controls
} = wp.blocks;

registerBlockType('guty-blocks/image-hero', {
    title: 'Image Hero Block',
    icon: 'format-image',
    category: 'common',

    // Somewhat like setting initial state in a react app
    attributes: {
        alignement: {
            type: 'string'
        },
        content: {
            type: 'array',
            source: 'children',
            selector: 'h1',
            default: 'Editable block content...',
        },
        imageUrl: {
            type: 'string',
            default: "http://placehold.it/800x300"
        },
        textColor: {
            type: 'string',
            default: null
        },
        gradientColor: {
            type: 'string',
            default: null
        }
    },

    // The editor "render" function
    edit(props) {

        let { focus } = props;
        let { alignment, content, imageUrl, textColor, gradientColor } = props.attributes;

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

        // Actual elements being 
        return ([
                props.isSelected && (<InspectorControls>
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
            props.isSelected && (
                <BlockControls>
                    <AlignmentToolbar
                            value={ alignment }
                            onChange={ (change) => props.setAttributes({alignment: change}) }
                        />
                </BlockControls>
            ),
            <div className={props.className} style={{ backgroundImage: `url(${imageUrl})` }}>
                <div 
                    className={`overlay`}
                    style={{
                        background: gradientColor,
                        opacity: '.3'
                    }}    
                ></div>
                <RichText
                    tagName="h1"
                    value={ content }
                    onChange={onChangeContent}
                    style={{  
                        color: textColor,
                        textAlign: alignment
                    }}
                />
            </div>
        ]);
    },

    // The save "render" function
    save(props) {
        let { className } = props;
        let { alignment, content, imageUrl, gradientColor, textColor } = props.attributes;

        return (
            <div className={className} style={{ backgroundImage: `url(${imageUrl})` }}>
                <div 
                    className={`overlay`} //Note to self... `${props.className}` was undefined here. Bug?
                    style={{
                        background: gradientColor,
                        opacity: '.3'
                    }}    
                ></div>
                <h1 style={{ 
                    color: textColor,
                    textAlign: alignment 
                    }}>{content}</h1>
            </div>
        );
    }

});
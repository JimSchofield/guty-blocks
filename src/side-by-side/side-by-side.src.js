import './side-by-side.editor.scss';
import './side-by-side.view.scss';

const {
    registerBlockType,
    RichText,
    MediaUpload
} = wp.blocks;

registerBlockType('guty-blocks/side-by-side', {
    title: 'Side by side block',
    icon: '',
    category: 'common',

    attributes: {
        selectedImage: {
            type: 'string',
            default: 'http://placehold.it/200x200'
        },
        content: {
            type: 'array',
            source: 'children',
            selector: 'p'
        }
    },

    edit(props) {
        const { className, setAttributes } = props;
        const { selectedImage, content, isSelected } = props.attributes;

        function changeText(changes) {
            setAttributes({ content: changes });
        }

        return (
            <div className={className}>
                <div className='left'>
                    <MediaUpload
                        onSelect={ image => {
                            const newImage = image.sizes.medium || image.sizes.thumbnail;
                            const url = newImage.url;
                            setAttributes({ selectedImage: image.sizes.medium.url })
                        }}
                        type="image"
                        value={selectedImage}
                        render={ ({ open } ) =>(
                            <div 
                                className="left-image"
                                onClick={open}
                                style={{backgroundImage: `url(${selectedImage})`}}>
                            </div>
                        )}
                    />    
                </div>
                <div className='right'>
                    <RichText
                        tagName="p"
                        value={content}
                        onChange={changeText}
                        placeholder='Enter text here...'
                        isSelected={isSelected}
                    />
                </div>
            </div>
        );
    },

    save(props) {
        const { className } = props;
        const { selectedImage, content } = props.attributes;

        return (
            <div className={className}>
                <div className='left'>
                    <div 
                        className="left-image"
                        onClick={open}
                        style={{backgroundImage: `url(${selectedImage})`}}
                        >
                    </div>
                </div>
                <div className='right'>
                    <p>
                        {content}
                    </p>
                </div>
            </div>
        );  
    }

});
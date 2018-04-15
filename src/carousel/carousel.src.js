import './carousel.editor.css';
import './carousel.view.css';

const {
    registerBlockType,
    MediaUpload,
    InspectorControls
} = wp.blocks;

registerBlockType('guty-blocks/carousel', {
    title: 'Carousel',
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        carouselImages: {
            type: 'array',
            default: []
        },
        carouselTime: {
            type: 'number',
            default: '5'
        },
        fadeTime: {
            type: 'number',
            default: '500' 
        }
    },

    // The editor "render" function
    edit(props) {
        const {
            className,
            setAttributes,
            attributes: {
                carouselImages,
                carouselTime,
                fadeTime
            }
        } = props;

        function changeImageArray(changes) {
            setAttributes({ carouselImages: changes });
        }
        function changeCarouselTime(changes) {
            setAttributes({ carouselTime: changes.target.value });
        }

        function changeFadeTime(changes) {
            setAttributes({ fadeTime: changes.target.value });
        }


        const MyMediaUpload = <MediaUpload
            onSelect={changeImageArray}
            type="image"
            multiple={true}
            render={({ open }) => (
                <button
                    onClick={open}
                    style={{ marginBottom: '16px' }}>
                    Select/Change Images
                </button>
            )}
        />;

        return ([
            <InspectorControls>
                <div>
                    {MyMediaUpload}
                </div>
                <div style={{marginBottom: '16px'}}>
                    Set fade length (milliseconds):
                    <input
                        type="number"
                        value={fadeTime}
                        onChange={changeFadeTime}
                    />
                </div>
                <div style={{marginBottom: '16px'}}>
                    Set slide interval (seconds):
                    <input
                        type="number"
                        value={carouselTime}
                        onChange={changeCarouselTime}
                    />
                </div>
            </InspectorControls>
            ,
            MyMediaUpload
            ,
            <div
                className={className}
                data-carousel-time={carouselTime}
                style={{
                    paddingBottom: '56.25%'
                }}>
                <div className='inner'>
                    {carouselImages.length ?
                        carouselImages.map((el, index) => {
                            return <img
                                src={el.sizes.full.url}
                                className={!index ? 'active' : null}
                                style={{ transition: `opacity ${fadeTime}ms` }}
                            />;
                        })
                        :
                        'No Images Yet'
                    }
                </div>
            </div>
        ]);
    },

    // The save "render" function
    save(props) {
        const {
            className,
            attributes: {
                carouselImages,
                carouselTime,
                fadeTime
            }
        } = props;

        return (
            <div
                className={className}
                data-carousel-time={carouselTime}
                style={{
                    paddingBottom: '56.25%'
                }}>
                <div className='inner'>
                    {carouselImages.length ?
                        carouselImages.map((el, index) => {
                            return <img
                                src={el.sizes.full.url}
                                className={!index ? 'active' : null}
                                style={{ transition: `opacity ${fadeTime}ms` }}
                            />;
                        })
                        :
                        'No images yet...'
                    }
                </div>
            </div>
        );
    }

}); ``
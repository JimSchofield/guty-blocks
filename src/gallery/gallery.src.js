import './gallery.editor.css';
import './gallery.view.css';

import { Image } from './Image';

const {
    registerBlockType,
} = wp.blocks;

const {
    RichText,
    PlainText,
    InspectorControls,
    MediaUpload
} = wp.editor;

registerBlockType('guty-blocks/gallery', {
    title: 'Custom Photo Gallery',
    icon: 'format-gallery',
    category: 'common',

    attributes: {
        titleText: {
            type: 'string'
        },
        imagesArray: {
            type: 'array',
            default: []
        },
        columns: {
            type: 'number',
            default: 2
        },
        alignment: {
            type: 'string',
            default: 'alignLeft'
        }
    },

    // The editor "render" function
    edit(props) {

        const { focus, className, setAttributes } = props;
        const { titleText, imagesArray, columns, alignment } = props.attributes;

        const changeTitle = (changes) => {
            setAttributes({ titleText: changes })
        };

        function changeImageArray(changes) {
            setAttributes({ imagesArray: changes })
        }

        function changeColumns(changes) {
            setAttributes({ columns: changes.target.value });
        }

        function changeAlignment(changes) {
            setAttributes({ alignment: changes.target.value });
        }

        function moveElement(elIndex, direction) {
            let tempArray = [...imagesArray];

            //take out element
            const el = tempArray.splice(elIndex, 1)[0];

            // place element in either previous or next
            tempArray.splice(elIndex + direction, 0, el);

            //set array back
            setAttributes({ imagesArray: tempArray });
        }

        function removeElement(elIndex) {
            let tempArray = [...imagesArray];
            tempArray.splice(elIndex, 1);
            setAttributes({ imagesArray: tempArray });
        }

        function addPhotos(images) {
            setAttributes({
                imagesArray: [...imagesArray, ...images]
            });
        }

        const MyMediaUpload = <MediaUpload
            onSelect={changeImageArray}
            type="image"
            multiple={true}
            render={({ open }) => (
                <button
                    onClick={open}>
                    Select Images
                </button>
            )}
        />;

        const AddPhotosUpload = <MediaUpload
            onSelect={addPhotos}
            type="image"
            multiple={true}
            render={({ open }) => {
                return (
                    <div class="galleryContainer-addPhoto">
                        <button onClick={open}>Add photo</button>
                    </div>
                )
            }}
        />;


        return ([
            focus && <InspectorControls>
                <div className='galleryInspector'>
                    <strong>Settings for gallery:"{titleText}"</strong>
                    {MyMediaUpload}
                    <div>
                        <label htmlFor="columns">Select Number of Columns:</label><br />
                        <select name="columns" onChange={changeColumns}>
                            {/* Adding a map to dynamically place selected option based off of attribtues */}
                            {[1, 2, 3, 4].map((el) => <option value={el} selected={el === columns}>{el} Column</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="alignment">Select Alignment:</label><br />
                        <select name="alignment" onChange={changeAlignment}>
                            {/* Adding a map to dynamically place selected option based off of attribtues */}
                            {["alignLeft", "alignCenter", "alignRight"].map((el) => <option value={el} selected={el === alignment}>{el}</option>)}
                        </select>
                    </div>
                </div>
            </InspectorControls>,
            <div className={className}>
                <section className='section'>
                    <h1>
                        <PlainText
                            tagName="h1"
                            value={titleText}
                            onChange={changeTitle}
                            placeholder='Enter Gallery Name Here'
                        />
                    </h1>

                    <div className={`galleryContainer galleryContainer_${columns}up galleryContainer_${alignment}`}>
                        {imagesArray.length ?
                            imagesArray.map((el, index) => {
                                return (
                                    <div className="imageWrapper">
                                        <Image
                                            key={index}
                                            photo={el}
                                            galleryID={titleText}
                                        />
                                        <div className="imageWrapper-buttons">
                                            {index !== 0 && <button onClick={() => moveElement(index, -1)}>&lt;</button>}
                                            <button onClick={() => removeElement(index)}>Remove</button>
                                            {(index !== (imagesArray.length - 1)) && <button onClick={() => moveElement(index, 1)}>&gt;</button>}
                                        </div>
                                    </div>
                                );
                            })
                            :
                            <div>
                                <h3>No images yet</h3>
                                {MyMediaUpload}
                            </div>
                        }
                        {AddPhotosUpload}
                    </div>
                </section>

            </div>
        ]);
    },

    // The save "render" function
    save(props) {

        const { className } = props;
        const { titleText, imagesArray, columns, alignment } = props.attributes;

        return (
            <div className={className}>
                <section className='section'>
                    <h1>{titleText}</h1>

                    <div className={`galleryContainer galleryContainer_${columns}up galleryContainer_${alignment}`}>
                        {
                            imagesArray.map((el, index) => {
                                return <Image
                                    key={index}
                                    photo={el}
                                    galleryID={titleText}
                                />
                            })
                        }
                    </div>
                </section>
            </div>
        );
    }

});
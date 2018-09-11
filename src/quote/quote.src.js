import './quote.editor.css';
import './quote.view.css';

const {
    registerBlockType,
} = wp.blocks;

const {
    RichText
} = wp.editor;

registerBlockType('guty-blocks/quote', {
    title: 'Custom Quote Block',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app.
        // Strategy for mapping rendered attributes back into editable state
        author: {
            type: 'string',
            default: 'author'
        },
        quoteContent: {
            type: 'string',
            default: 'Enter quote here'
        }
    },

    // The editor "render" function
    edit(props) {
        let {className} = props;
        return (
            <aside className={"quote " + className}>
                <div className="quote-text">
                    <span className="first-last-quotes">“</span>
                    <RichText
                        tagName="span"
                        value={props.attributes.quoteContent}
                        onChange={(changes) => props.setAttributes({ quoteContent:changes })}
                        />
                    <span className="first-last-quotes">”</span>
                </div>
                <div className="author">
                    - <RichText
                            tagName="span"
                            value={props.attributes.author}
                            onChange={(changes) => props.setAttributes({ author: changes})}
                            />
                </div>
            </aside>
        );
    },

    // The save "render" function
    save(props) {
        let {className} = props;
        return (
            <aside className={"quote " + className}>
                <div className="quote-text">
                    <span className="first-last-quotes">“</span>
                    {props.attributes.quoteContent}
                    <span className="first-last-quotes">”</span>
                </div>
                <div className="author">
                    - {props.attributes.author}
                </div>
            </aside>
        );
    }

});

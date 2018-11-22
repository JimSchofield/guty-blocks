import './prism-code.editor.css';
import './prism-code.view.css';

import TextareaAutosize from 'react-autosize-textarea';

var Prism = require('./prismjs/prism.js');

var nativeElements = {};

const {
    registerBlockType,
} = wp.blocks;

const {
    PlainText,
    BlockControls,
    InspectorControls
} = wp.editor;

console.log(wp.editor);

registerBlockType('guty-blocks/prism-code', {
    title: 'Prism Code Formatter',
    icon: 'editor-code',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        codeString: {
            type: 'string',
            default: '',
        },
        beautifulCode: {
            type: 'string',
            default: ''
        },
        language: {
            type: 'string',
            default: 'javascript'
        },
        tabLength: {
            type: 'number',
            default: 4
        }
    },

    // The editor "render" function
    edit(props) {
        const {
            className,
            setAttributes,
            focus,
            attributes: {
                codeString,
                beautifulCode,
                language,
                tabLength
            } 
        } = props;

        function changeLanguage(event) {
            let newLanguage = event.target.value;
            let tempCodeString = Prism.highlight(codeString, Prism.languages[newLanguage]);
            setAttributes({
                language: newLanguage,
                beautifulCode: tempCodeString
            })
        }
        function changeCode(changes, event) {
            let tempCodeString = Prism.highlight(changes, Prism.languages[language]);
            setAttributes({
                beautifulCode: tempCodeString,
                codeString: changes
            });
        }
        
        function changeTabLength(event) {
            console.log(event.target.value, parseInt(event.target.value))
            setAttributes({ tabLength: parseInt(event.target.value) })
        }

        function checkKey(event) {
            // checks for a tab, and if present, manually adds spacing
            if(event.keyCode == 9) {
                // escape browser tabbing
                event.preventDefault();

                // get cursor location
                let location = event.nativeEvent.target.selectionEnd;
                
                // "splice" a tab
                let newCodeString = codeString.slice(0,location) + ' '.repeat(tabLength) + codeString.slice(location);


                let newBeautifulCodeString = Prism.highlight(newCodeString, Prism.languages[language]);

                setAttributes({
                    codeString: newCodeString,
                    beautifulCode: newBeautifulCodeString
                });

                // setTimout hack will have to suffice since setAttribute callback is not available
                setTimeout(() => {
                    nativeElements.inputRef.focus();
                    nativeElements.inputRef.selectionEnd = location + tabLength;
                }, 0);
            }
        }

        return ([
            <InspectorControls>
                <div style={{ margin: '24px 0'}}>
                    <strong style={{display: 'block'}}>Change the language:</strong>
                    <select onChange={changeLanguage}>
                        <option value="javascript" selected={language === 'javascript'}>Javascript</option>
                        <option value="jsx" selected={language === 'jsx'}>JSX</option>
                        <option value="markup" selected={language === 'markup'}>HTML</option>
                        <option value="css" selected={language === 'css'}>CSS</option>
                        <option value="php" selected={language === 'php'}>PHP</option>
                    </select>
                    </div>
                <div style={{ margin: '24px 0'}}>
                    <strong style={{display: 'block'}}>Tab character length:</strong>
                    <select onChange={changeTabLength}>
                        <option value="2" selected={tabLength == 2}>2</option>
                        <option value="4" selected={tabLength == 4}>4</option>
                    </select>
                </div>
            </InspectorControls>
            ,
            <div className={className}>
                <pre class={`language-${language}`}>
                    <TextareaAutosize
                        value={codeString}
                        tag="code"
                        onChange={(e) => changeCode(e.target.value, e)}
                        onKeyDown={checkKey}
                        placeholder='Type some code here...'
                        innerRef={el => (nativeElements.inputRef = el)} //storing reference to try to set cursor position
                    />
                </pre>  
                <pre class={`language-${language}`}>
                    <code dangerouslySetInnerHTML={{ __html: beautifulCode }}>
                    </code>
                </pre>

            </div>
        ]);
    },

    // The save "render" function
    save(props) {
        const {
            className,
            attributes: {
                codeString,
                beautifulCode,
                language
            }
        } = props;

        return (
            <div className={className}>
                <pre class={`language-${language}`}>
                    <code dangerouslySetInnerHTML={{ __html: beautifulCode }}>
                    </code>
                </pre>
            </div>
        );
    }

});
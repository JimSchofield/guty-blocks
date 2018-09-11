import './block-layout.editor.css';
import './block-layout.view.css';

const {
    registerBlockType,
} = wp.blocks;

const {
    InnerBlocks,
    InspectorControls
} = wp.editor;

registerBlockType('guty-blocks/block-layout', {
    title: 'Block Layout',
    category: 'layout',

    attributes: { // Somewhat like setting initial state in a react app.
        // Strategy for mapping rendered attributes back into editable state

    },

    // The editor "render" function
    edit(props) {
        return ([
            props.isSelected && (
                <InspectorControls>
                    Select the number of columns for your blocks:
                    
                </InspectorControls>
            ),
            < div class={ props.className }>
                <InnerBlocks
                    layouts={{
                        normal: { label: 'Normal Width', icon: 'align-center' },
                        wide: { label: 'Width Width', icon: 'align-wide' },
                    }} />
            </div >
        ]);
    },

// The save "render" function
save(props) {
    return (
        <div class={props.className}>
            <InnerBlocks.Content />
        </div>
    );
}

});

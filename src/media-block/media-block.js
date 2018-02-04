const { registerBlockType } = wp.blocks;

registerBlockType('guty-blocks/media-block', {
  title: 'Media Item Block',
  icon: 'smiley',
  category: 'common',
  
  attributes: {
    Title: {
      type: 'string',
      default: 'Editable block content...',
    },
  },

  // Defines the block within the editor.
  edit(props) {

    var content = props.attributes.content;

    function onChangeContent(updatedContent) {
      props.setAttributes({ content: updatedContent });
    }

    return (
      <p className={props.className}>Hello, WP editor!  </p>
    );
  },

  // Defines the saved block.
  save(props) {


    function placeScript() {
      return { __html: 'window.TEST = "thing"' };
    }
    return (
      [
        <p className={props.className}>Hello, World!</p>,
        <script dangerouslySetInnerHTML={placeScript()}></script >
      ]
    );
  }
}
);
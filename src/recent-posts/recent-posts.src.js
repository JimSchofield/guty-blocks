import './recent-posts.editor.css';
import './recent-posts.view.css';

const {
    registerBlockType,
} = wp.blocks;

const {
    Editable, // Text field - will be replaced by RichText in future updates
    InspectorControls, // allows us to add controls on the sidebar
} = wp.editor;

registerBlockType('guty-blocks/recent-posts', {
    title: 'Recent Posts Block',
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        numberUp: {
            type: 'string',
            default: '1_up'
        },
        posts: {
            type: 'array',
            default: []
        }
    },

    // The editor "render" function
    edit(props) {

        let { content, posts, numberUp } = props.attributes;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }
        function onChangeNumberUp(newNumberUp) {
            props.setAttributes({ numberUp: newNumberUp.target.value });
        }

        async function fetchArticles() {
            let data = await fetch('/wp-json/wp/v2/posts/');
            let posts = await data.json();
            props.setAttributes({ posts });
        }

        // Actual elements being rendered
        return ([
            !!focus && (
                <InspectorControls key="controls">
                    Select Layout:
                    <select
                        onChange={onChangeNumberUp}>
                        <option value="one_up">1 up blocks</option>
                        <option value="two_up">2 up blocks</option>
                        <option value="three_up">3 up blocks</option>
                    </select>

                </InspectorControls>
            ),
            <div className={props.className}>
                <div className="sysMessage">
                    <button onClick={fetchArticles}>Fetch me recent articles!</button>
                    {posts.length === 0 ?
                        <h1>Posts not pulled yet</h1>
                        :
                        <h1>{posts.length} found!</h1>}
                </div>
                <div className={`articleContainer ${numberUp}`}>
                    {posts && posts.map((el) => {
                        return <RenderArticleButton
                            title={el.title.rendered}
                            desc={el.excerpt.rendered}
                            url={el.link}
                        />
                    })}
                </div>
            </div>
        ]);
    },

    // The save "render" function
    save(props) {

        let { posts, numberUp } = props.attributes;

        return (
            <div className={props.className}>
                <div className={`articleContainer ${numberUp}`}>
                    {posts && posts.map((el) => {
                        return <RenderArticleButton
                            title={el.title.rendered}
                            desc={el.excerpt.rendered}
                            url={el.link}
                        />
                    })}
                </div>
            </div>
        );
    }

});

function RenderArticleButton(props) {
    return (
        <div class="articleButton">
            <h3 dangerouslySetInnerHTML={{ __html: props.title }}></h3>
            <p dangerouslySetInnerHTML={{ __html: props.desc }}></p>
            <a href={props.url}>Go to article...</a>
        </div>
    )
}
// import React from 'react';
// import ReactDOM from 'react-dom';

/**
 * Import HTML entity encoder/decoder.
 *
 * Lodash has it's own "unescape" entity decoder, but it is not as "robust" as he.
 *
 * @link https://lodash.com/docs/4.17.5#unescape
 * @link https://github.com/mathiasbynens/he
 */
import he from 'he';

class ReactLive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsIds: JSON.parse( this.props.posts ),
            posts: []
        }

        this.fetchPosts = this.fetchPosts.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetch('/wp-json/wp/v2/posts/' + '?include[]=' + this.state.postsIds.join('&include[]='))
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    posts: json
                })
            });
    }

	/**
	 * Do not expect REST API to return plain old strings for everything.
	 * It is common and expected that WP content from the REST API will contain markup of one kind or another,
	 * depending on the field.
	 *
	 * @link https://github.com/WP-API/WP-API/issues/1227
	 *
	 * @param string
	 * @returns {{__html}}
	 */
	createMarkup = ( string ) => {
		return { __html: he.decode( string ).trim() };
	};

    render() {
        return (
            <div>
                <strong>
                    React is running live in the view.  It takes the ids of the posts from the saved div in the editor and fetches the post content from the REST API to render below:
                </strong>
                <ul>
                    {!this.state.posts.length ?
                        <p>Loading...</p>
                        :
                        this.state.posts.map((el, i) => {
                            return (
                                <li>
                                    <h3 dangerouslySetInnerHTML={ this.createMarkup( el.title.rendered ) } />
                                    <div dangerouslySetInnerHTML={ this.createMarkup( el.excerpt.rendered ) } />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

window.onload = function () {
    let container = document.getElementById('live-react');
    if (container) {
        let postData = container.getAttribute('data-post-ids')
        ReactDOM.render(
            <ReactLive posts={postData}/>,
            container
        )
    }
};

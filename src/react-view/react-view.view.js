// import React from 'react';
// import ReactDOM from 'react-dom';

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
                                    <h3>{el.title.rendered}</h3>
                                    <p>{el.excerpt.rendered}</p>
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

import React from 'react';

const buttonStyles = {
    padding: '.5em',
    margin: '.5em .5em 0 0',
    background: 'white',
    border: '1px solid #222',
    cursor: 'pointer'
}

const buttonStyles_selected = Object.assign({}, buttonStyles, {background: '#faf'})

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: null,
            results: [],
        }
        this.fetchSomePosts = this.fetchSomePosts.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.pageBack = this.pageBack.bind(this);
    }

    componentDidMount() {
        this.fetchSomePosts(1);
    }

    fetchSomePosts(pageIndex) {
        fetch(`/wp-json/wp/v2/posts/?per_page=30&page=${pageIndex}`)
            .then((res) => {

                !this.state.totalPages && this.setState({
                    totalPages: res.headers.get('X-WP-TotalPages')
                })
                
                return res.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    results: data,
                    currentPage: pageIndex
                })
            });
    }
    
    pageUp() {
        let nextPage = this.state.currentPage + 1;
        this.fetchSomePosts(nextPage);
    }

    pageBack() {
        let previousPage = this.state.currentPage - 1;
        this.fetchSomePosts(previousPage);
    }


    render() {

        const { results } = this.state;
        const { selectedPostIds, togglePost } = this.props;

        return (
            <div style={{overflow: 'auto'}}>
                <strong>Select related posts:</strong>
                <p>Showing page {this.state.currentPage} of {this.state.totalPages} pages</p>
                <ul style={{padding: '1em 0'}}>
                        {
                            this.state.results.map((el, i) => {

                                let isSelected = !(selectedPostIds.indexOf(el.id) === -1);

                                return (
                                    <li 
                                        key={el.id}
                                        style={{display: 'inline-block'}}>
                                        <button 
                                            style={isSelected ? buttonStyles_selected : buttonStyles}
                                            onClick={() => togglePost(el.id)}
                                            >{el.title.rendered}</button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {
                        this.state.currentPage > 1 && 
                        <button onClick={this.pageBack}>Previous 20</button>
                    }
                    {
                        this.state.currentPage < this.state.totalPages &&
                        <button onClick={this.pageUp} style={{float: 'right'}}>Next 20</button>
                    }
            </div>
        );
    }
}
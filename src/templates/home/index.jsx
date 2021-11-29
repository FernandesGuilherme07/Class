import { Component } from 'react'
import './styles.css';
import { Posts } from '../../components/posts'
import { loadposts } from '../../utils/load-posts';
import { Buttom } from '../../components/Buttom';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
 state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 9,
      searchValue: '',
    };

    async componentDidMount() {
      await this.loadPosts();
    }
  
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadposts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value})
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

    return (

      <section className="container">
        <div class="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        <br/> <br/> <br/>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}

        <div className="buttom-container">
          {!searchValue&& (
             <Buttom 
         text="Load more posts"
         onClick={this.loadMorePosts}
         disabled={noMorePosts}
        />
          )}
       
        </div>
      </section>
    );
}
}

export default Home;

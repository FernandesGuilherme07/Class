import { Component } from 'react'
import './styles.css';
import { Posts } from '../../components/posts'
import { loadposts } from '../../utils/load-posts';
import { Buttom } from '../../components/Buttom';

class Home extends Component {
 state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 9,
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
  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (

      <section className="container">
        <Posts posts={posts}/>
        <Buttom 
         text="Load more posts"
         onClick={this.loadMorePosts}
         disabled={noMorePosts}
        />
      </section>
    );
}
}

export default Home;
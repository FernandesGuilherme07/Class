import './App.css';
import { Component } from 'react';

class App extends Component {
    
    state = {
      posts: [],
      photos: []
    };
  
    componentDidMount() {
      this.loadposts();
    }
//https://rickandmortyapi.com/api/character'
    loadposts = async () => {
     
      const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
      const pothosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
      
      const [ posts, photos ] = await Promise.all(
        [postsResponse, pothosResponse]);

      const postsJson = await posts.json();
      const photosJson = await photos.json();

      const postsAndPhotos = postsJson.map((posts, index) => {
        return { ...posts, cover: photosJson[index].url }
    });

      this.setState({ posts: postsAndPhotos });

    }
      render () {
    const { posts } = this.state;

  return (
    <section className="container">
    <div className="cards">
   
      {posts.map(posts => (   
        <div className="card">
          <img src={posts.cover} alt={posts.title}/>
          <div key={posts.id} 
          className="post-content">
            <h1>{posts.title}</h1>
            <p>{posts.body}</p>
          </div>
        </div>
      ))}
    </div>
    </section>
  )
  }
}

export default App;

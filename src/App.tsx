import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import Navbar from './Navbar'
import Blog from './Blog';
import image from './assets/agnus-dei.png'

// Sample blog data - in a real app, this would come from an API or state management
export const allBlogs = [
  { topic: 'THEOLOGY', title: 'Featured: Understanding the Divine Nature', image: image, date: new Date('2024-01-15'), featured: true, tag: 'divine-nature' },
  { topic: 'THEOLOGY', title: 'The Role of Faith in Modern Society', image: image, date: new Date('2024-01-10'), featured: false, tag: 'faith-society' },
  { topic: 'CULTURE', title: 'How Christianity Shapes Western Culture', image: image, date: new Date('2024-01-08'), featured: false, tag: 'christianity-culture' },
  { topic: 'APOLOGETICS', title: 'Defending the Faith: A Modern Approach', image: image, date: new Date('2024-01-05'), featured: false, tag: 'apologetics' },
  { topic: 'THEOLOGY', title: 'Exploring Biblical Hermeneutics', image: image, date: new Date('2024-01-03'), featured: false, tag: 'hermeneutics' },
  { topic: 'CULTURE', title: 'Christian Values in Contemporary Art', image: image, date: new Date('2024-01-01'), featured: false, tag: 'art-values' },
];

export function HomePage() {
  const location = useLocation();
  const featuredBlog = allBlogs.find(blog => blog.featured);
  const regularBlogs = allBlogs.filter(blog => !blog.featured);
  
  // Force re-render when location changes
  useEffect(() => {
    // This ensures the component updates when route changes
  }, [location.pathname]);

  return (
    <>
      {featuredBlog && (
        <section className="featured-section">
          <h2 className="featured-header">Featured</h2>
          <div className="featured-container">
            <Blog 
              topic={featuredBlog.topic} 
              title={featuredBlog.title} 
              image={featuredBlog.image} 
              date={featuredBlog.date} 
              featured={true}
              tag={featuredBlog.tag}
            />
          </div>
        </section>
      )}

      <section className="blogs-section">
        <h2 className="blogs-header">Latest Posts</h2>
        <div className="blogs-grid">
          {regularBlogs.map((blog, index) => (
            <Blog 
              key={index}
              topic={blog.topic} 
              title={blog.title} 
              image={blog.image} 
              date={blog.date} 
              featured={false}
              tag={blog.tag}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export function TopicPage() {
  const { topic } = useParams<{ topic: string }>();
  const location = useLocation();
  
  // Prevent "tag" from being treated as a topic
  if (topic?.toLowerCase() === 'tag') {
    return null;
  }
  
  // Normalize topic name (e.g., "Theology" -> "THEOLOGY")
  const normalizedTopic = topic?.toUpperCase() || '';
  const topicBlogs = allBlogs.filter(blog => 
    blog.topic.toUpperCase() === normalizedTopic && !blog.featured
  );
  
  // Force re-render when location changes
  useEffect(() => {
    // This ensures the component updates when route changes
  }, [location.pathname]);

  return (
    <section className="blogs-section">
      <h2 className="blogs-header">{topic} Articles</h2>
      {topicBlogs.length > 0 ? (
        <div className="blogs-grid">
          {topicBlogs.map((blog, index) => (
            <Blog 
              key={index}
              topic={blog.topic} 
              title={blog.title} 
              image={blog.image} 
              date={blog.date} 
              featured={false}
              tag={blog.tag}
            />
          ))}
        </div>
      ) : (
        <p className="no-results">No articles found for this topic.</p>
      )}
    </section>
  );
}

export function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const location = useLocation();
  const tagBlogs = allBlogs.filter(blog => blog.tag === tag);
  
  // Force re-render when location changes
  useEffect(() => {
    // This ensures the component updates when route changes
  }, [location.pathname]);

  return (
    <section className="blogs-section">
      <h2 className="blogs-header">Articles tagged: {tag}</h2>
      {tagBlogs.length > 0 ? (
        <div className="blogs-grid">
          {tagBlogs.map((blog, index) => (
            <Blog 
              key={index}
              topic={blog.topic} 
              title={blog.title} 
              image={blog.image} 
              date={blog.date} 
              featured={blog.featured}
              tag={blog.tag}
            />
          ))}
        </div>
      ) : (
        <p className="no-results">No articles found with this tag.</p>
      )}
    </section>
  );
}

function App() {
  return (
    <div className='page'>
      <Navbar blogs={allBlogs} />
      <Outlet />
    </div>
  )
}

export default App;

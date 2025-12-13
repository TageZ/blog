import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import Navbar from './Navbar'
import Blog from './Blog';
import { allBlogs, contentMap } from './blogs';
import ContactForm from './ContactForm';

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

export function ArticlePage() {
  const { article } = useParams<{ article: string }>();
  const location = useLocation();
  const articleData = allBlogs.find(blog => blog.tag === article);
  
  useEffect(() => {
  }, [location.pathname]);

  if (!articleData) {
    return (
      <section className="article-section">
        <div className="article-container">
          <p className="no-results">Article not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="article-section">
      <div className="article-container">
        <div className="article-header">
          <span className="article-topic">{articleData.topic}</span>
          <h1 className="article-title">{articleData.title}</h1>
          <span className="article-date">
            {articleData.date.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        <div className="article-image-container">
          <img src={articleData.image} alt={articleData.title} className="article-image" />
        </div>
        <div className="article-content">
          <ReactMarkdown>{contentMap[articleData.tag] || 'Content coming soon...'}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have a question, suggestion, or just want to connect? 
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <svg 
                className="contact-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div className="contact-details">
                <h3 className="contact-label">Email</h3>
                <a href="mailto:mail@tagezerby.com" className="contact-email">
                  mail@tagezerby.com
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3 className="form-title">Send a Message</h3>
                <ContactForm />
          </div>

          <div className="contact-footer">
            <p className="contact-note">
              You can also check out my <a href="https://tagezerby.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">portfolio website</a> or connect on social media.
            </p>
            
            <div className="social-links">
              <a 
                href="https://x.com/tzerby17" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="X (Twitter)"
              >
                <svg 
                  className="social-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/tage-zerby" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg 
                  className="social-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://instagram.com/tzerby17" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Instagram"
              >
                <svg 
                  className="social-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>
              
              <a 
                href="https://github.com/TageZ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="GitHub"
              >
                <svg 
                  className="social-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
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

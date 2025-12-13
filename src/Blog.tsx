import { useNavigate } from 'react-router-dom';

interface BlogProps{
    topic: string;
    title: string;
    image: string;
    date: Date;
    featured: boolean;
    tag: string;
}

function Blog({topic, title, image, date, featured, tag}: BlogProps){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/tag/${tag}`);
    };

    return (
        <div 
            className={`blog-post ${featured ? 'featured' : ''}`}
            onClick={handleClick}
        >
            <div className="blog-image-container">
                <img src={image} alt={title} className="blog-image"/>
            </div>
            <h2 className='blog-topic'>
                {topic}
            </h2>
            <h1 className='blog-title'>
                {title}
            </h1>
            <span className='blog-date'>
                {date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
            </span>
        </div>
    )
}

export default Blog;
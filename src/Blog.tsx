
interface BlogProps{
    topic: string;
    title: string;
    image: string;
    date: Date;
    featured: boolean;
}

function Blog({topic, title, image, date, featured}: BlogProps){

    return (
        <div className='blog-post'
            style={{
                border: '2px solid',
                width: 'fit-content',
                padding: '20px',
                margin: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontFamily: 'inherit'
            }}
        >
            <img src={image} style={{width: '300px', marginBottom: '20px'}}/>
            <h2 className='blog-topic'
                style={{
                    width: '300px',
                    fontSize: '1rem',
                    color: '#3A6D8C',
                    fontWeight: 'bold'
                }}
            >
                {topic}
            </h2>
            <h1 className='blog-title'
                style={{
                    width: '300px',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </h1>
            
            <span className='blog-date'
                style={{
                    width: '300px',
                    fontSize: '0.9rem',
                    color: '#999999',
                    marginTop: '20px'
                }}
            >
                {date.toUTCString()}
            </span>
        </div>
    )
}

export default Blog;
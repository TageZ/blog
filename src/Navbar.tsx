import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface Blog {
    topic: string;
    title: string;
    image: string;
    date: Date;
    featured: boolean;
    tag: string;
}

interface NavbarProps {
    blogs: Blog[];
}

// Calculate similarity between search query and tag
function calculateSimilarity(query: string, tag: string): number {
    const queryLower = query.toLowerCase();
    const tagLower = tag.toLowerCase();
    
    // Exact match
    if (tagLower === queryLower) return 1.0;
    
    // Starts with query
    if (tagLower.startsWith(queryLower)) return 0.8;
    
    // Contains query
    if (tagLower.includes(queryLower)) return 0.6;
    
    // Check individual words
    const queryWords = queryLower.split(/[\s-]+/);
    const tagWords = tagLower.split(/[\s-]+/);
    let matches = 0;
    
    queryWords.forEach(word => {
        if (tagWords.some(tagWord => tagWord.includes(word) || word.includes(tagWord))) {
            matches++;
        }
    });
    
    if (matches > 0) {
        return 0.4 * (matches / queryWords.length);
    }
    
    return 0;
}

function Navbar({ blogs }: NavbarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const options = ['Theology', 'Culture', 'Code', 'Football', 'Politics', 'History'];

    // Get unique tags from blogs
    const allTags = Array.from(new Set(blogs.map(blog => blog.tag)));

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            // Calculate similarity scores for all tags
            const tagScores = allTags.map(tag => ({
                tag,
                score: calculateSimilarity(searchQuery, tag)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5) // Top 5 suggestions
            .map(item => item.tag);
            
            setSuggestions(tagScores);
            setShowSuggestions(tagScores.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery, allTags]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSuggestionClick = (tag: string) => {
        setSearchQuery('');
        setShowSuggestions(false);
        navigate(`/tag/${tag}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            handleSuggestionClick(suggestions[0]);
        }
    };

    return (
        <div className="navbar">
            <div className="header-box">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1 className="blog-title"> 
                        Zerbology
                    </h1>
                </Link>
                <hr style={{
                    width: '100%',
                    margin: '1.5rem 0 0'
                }}/>
            </div>
            <div className="links-box">
                <ul className="links">
                    <li className="link">
                        <NavDropdown
                            title="Topic "
                            menuVariant="light"
                        >
                            {options.map((option, i) => (
                                <NavDropdown.Item 
                                    key={i}
                                    onClick={() => navigate(`/${option}`)}
                                >
                                    {option}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </li>
                    <li className="link">
                        About
                    </li>
                    <li className="link" onClick={() => window.open('https://tagezerby.com', '_blank')}>
                        Portfolio
                    </li>
                    <li className="link" onClick={() => navigate('/contact')}>
                        Contact
                    </li>
                    <li className="link">
                        <div className="search-bar-container" ref={searchRef}>
                            <svg 
                                className="search-icon" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="search-suggestions">
                                    {suggestions.map((tag, index) => (
                                        <div 
                                            key={index}
                                            className="search-suggestion-item"
                                            onClick={() => handleSuggestionClick(tag)}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
                <hr style={{
                    width: '100%',
                    margin: '0'
                }}/>
            </div>
        </div>
    )
}

export default Navbar;

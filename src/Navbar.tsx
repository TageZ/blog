
function Navbar(){

    return (
        <div className="navbar">
            <div className="header-box">
                <h1 className="blog-title"> 
                    The Voice of One Crying Out on the Internet
                </h1>
                <hr style={{
                    width: '100%',
                    margin: '1rem 0 0'
                }}/>
            </div>
            <div className="links-box">
                <ul className="links">
                    <li className="link">
                        Topics
                    </li>
                    <li className="link">
                        About me
                    </li>
                    <li className="link">
                        Request a topic
                    </li>
                    <li className="link">
                        Contact
                    </li>
                    <li className="link">
                        *Search bar*
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
import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
        userOptions = (


            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Walk and Sketch</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link to="/tours" className="nav-link">Tours</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" onClick={handleLogOut} className="nav-link">Logout</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user-details" className="nav-link">{user.name}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    const publicOptions = (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Walk and Sketch</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link to="/tours" className="nav-link">Tours</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        
    )

    return (
        <header>

            <Link to="/">
                <div className="logo-wrapper" alt="logo">
                </div>
            </Link>
            {user ? userOptions : publicOptions}
        </header>
    )
}

export default Nav


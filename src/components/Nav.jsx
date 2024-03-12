import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
        userOptions = (

<nav className="navbar navbar-expand-md fixed-top px-3" style={{ backgroundImage: 'url("/src/assets/images/hand-drawn-abstract-outline-background_23-2150611895.jpg")', backgroundSize: 'cover'}} >
    <a className="navbar-brand text-light" href="/">Walk and Sketch</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link to="/tours" className="nav-link text-light">Tours</Link>
            </li>
            <li className="nav-item">
                <Link to="/about" className="nav-link text-light">About</Link>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/user-details" className="dropdown-item">Account</Link>
                    <Link to="/" onClick={handleLogOut} className="dropdown-item">Logout</Link>
                </div>
            </li>
        </ul>
    </div>
</nav>




        )
    }

    const publicOptions = (

<nav className="navbar navbar-expand-md fixed-top px-3" style={{ backgroundImage: 'url("/src/assets/images/hand-drawn-abstract-outline-background_23-2150611895.jpg")', backgroundSize: 'cover'}} >
                <a className="navbar-brand text-light" href="/">Walk and Sketch</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item ">
                            <Link to="/tours" className="nav-link text-light">Tours</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link text-light">About</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link to="/signup" className="nav-link text-light">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-light">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>


    )

    return (
        <div className="container-fluid">
            {user ? userOptions : publicOptions}
        </div>
    )
}

export default Nav


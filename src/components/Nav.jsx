import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
        userOptions = (
            <nav>
                <h3>Welcome {user.name}!</h3>
                <Link to="/">Home</Link>
                <Link to="/tours">Tours</Link>
                <Link to="/about">About</Link>
                <Link onClick={handleLogOut} to="/">
                    Sign Out
                </Link>
            </nav>
        )
    }

    const publicOptions = (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tours">Tours</Link>
            <Link to="/about">About</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
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


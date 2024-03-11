import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = (props) => {

    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await SignInUser(formValues)
        setFormValues({ email: '', password: '' })
        props.setUser(payload)
        navigate('/')
    }

    return (
        <div className="">
            <div className="">
                <form className="p-3" onSubmit={handleSubmit}>
                    <div className="input-wrapper p-1">
                        <label className="p-2" htmlFor="email">Email</label>
                        <input
                            className=''
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            value={formValues.email}
                            required
                        />
                    </div>
                    <div className="input-wrapper p-1">
                        <label className="form-label p-1" htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            value={formValues.password}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" disabled={!formValues.email || !formValues.password}>
                        Sign In
                    </button>
                </form>
                <a className="p-2" href="/signup/">Create an account &rarr;	</a>
            </div>
            <br />
            <div>
                <strong>User Login-</strong> username: user@gmail.com password: 123
                <br/>
                <strong>Admin Login-</strong> username: admin@gmail.com password: seirocks
            </div>
        </div>
    )
}

export default SignIn
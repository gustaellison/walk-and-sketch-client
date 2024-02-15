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
                <form className="" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label className="" htmlFor="email">Email</label>
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
                    <div className="input-wrapper">
                        <label className="form-label" htmlFor="password">Password</label>
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
            </div>
        </div>
    )
}

export default SignIn
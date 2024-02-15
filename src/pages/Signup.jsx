import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminStatus: false
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await RegisterUser({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
            adminStatus: formValues.adminStatus,
        })
        setFormValues({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            adminStatus: false
        })
        navigate('/login')
    }

    return (
        <div className="signin col">
            <div className="card-overlay centered">
                <form className="col" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="John Smith"
                            value={formValues.name}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            autoComplete="username"
                            placeholder="example@example.com"
                            value={formValues.email}
                            required
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            autoComplete="new-password"
                            name="password"
                            placeholder="new password"
                            value={formValues.password}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            placeholder="re-enter new password"
                            value={formValues.confirmPassword}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="adminStatus">Admin Status</label>
                        <select
                            onChange={handleChange}
                            name="adminStatus"
                            value={formValues.adminStatus}
                            required
                        >
                            <option value={true}>Admin</option>
                            <option value={false}>User</option>
                        </select>
                    </div>
                    <button
                        className='btn btn-primary'
                        disabled={
                            !formValues.email ||
                            (!formValues.password &&
                                formValues.confirmPassword === formValues.password)
                        }
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
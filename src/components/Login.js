import { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useInput from "../hooks/useInput"
import axios from "../api/axios"
import useToggle from "../hooks/useToggle"
const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useAuth()
    const userRef = useRef()
    const errRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [check,toggleCheck]=useToggle('persist',false)


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            )
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken
            //const roles = response?.data?.roles
            setAuth({ user, accessToken })
            resetUser()
            setPwd('')
            navigate(from, { replace: true })

        }
        catch (e) {
            if (!e?.response) {
                setErrMsg('No server response')
            }
            else if (e.response?.status === 400) {
                setErrMsg('Missing username or password')
            }
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized')
            }
            else {
                setErrMsg('Log in failed')
            }
            errRef.current.focus()
        }
    }

    // const togglePersist = () => {
    //     setPersist(prev => !prev)
    // }
    // useEffect(() => {
    //     localStorage.setItem('persist', persist)
    // }, [persist])


    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username :
                </label>
                <input
                    type="text"
                    id='username'
                    required
                    autoComplete="off"
                    ref={userRef}
                    {...userAttribs}
                />
                <label htmlFor="password">
                    Password :
                </label>
                <input
                    type="password"
                    id='password'
                    value={pwd}
                    required
                    onChange={(e) => setPwd(e.target.value)}
                />
                <button >Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id='persist'
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">
                        Trust this device
                    </label>
                </div>
            </form>
            <p>Need an account?<br />
                <span className="line"><a href='#'>Sign Up</a></span></p>
        </section>
    )
}
export default Login
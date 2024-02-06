import useAuth from './useAuth'
import axios from '../api/axios'

const useLogout = () => {
    const { setAuth } = useAuth()
    const logout = async () => {
        setAuth({})
        try {
            const response = await axios('./logout', { withCredentials: true })
        } catch (e) {
            console.log(e)
        }
    }
    return logout

}
export default useLogout
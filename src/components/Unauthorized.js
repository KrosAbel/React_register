import { Link,useNavigate } from 'react-router-dom'

const Unauthorized= () => {
    const navigate=useNavigate()
    const goback=()=>navigate(-1)
    return (
        <section>
            <h1>Unauthorized Page</h1>
            <br />
            <p>401 Unauthorized page</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
                <button onClick={goback}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized
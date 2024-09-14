import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin} = useAuth()

    useTitle(`techNotes: ${username}`)
    
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-Us', { dateStyle: 'full', timeStyle: 'full'}).format(date)
    
    const content = (
        <section className="welcome">
            <p>{today}</p>

            <h1>Welcome {username}!</h1> 
            
            <p><Link to="/dash/note">View techNotes</Link></p>

            <p><Link to="/dash/note/new">Add New techNote</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/user">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/user/new">Add New User</Link></p>}
        </section>
    )
  return content
}

export default Welcome
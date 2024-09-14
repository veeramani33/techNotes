import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import { PulseLoader } from "react-spinners";
import useTitle from '../../hooks/useTitle'

const NewNote = () =>{
    useTitle('techNotes: New Note')

    const { user } = useGetUsersQuery("UsersList", {
        selectFromResult: ({ data }) => ({
            user: data?.ids.map( id => data?.entities[id])
        }),
    })

    if(!user) return <PulseLoader color={"#FFF"}/>
    const content = <NewNoteForm users={user}/> 

    return content
}

export default NewNote
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import { PulseLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";


const EditNote = () => {
    
    useTitle('techNotes: Edit Note')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!note || !user?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditNoteForm note={note} users={user} /> 
   // const content = <EditNoteForm note={note} users={users} />
    return content
}   

export default EditNote
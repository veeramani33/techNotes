import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const DashFooter = () => {
    const { username,status } = useAuth()
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onGoHome = () => navigate('/dash')
    let goHomeButton = null;
    console.log(pathname);
    if(pathname !== '/dash'){
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHome}
            >
                <FontAwesomeIcon icon={faHouse}/>
            </button>
        )
    }

    const content =(
        <footer className="dash-footer">
            {goHomeButton}
            <p>current user:{username}</p>
            <p>status:{status}</p>
        </footer>
    )

    return content;
}

export default DashFooter
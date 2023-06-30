import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.ts";
import { auth } from "../../config/firebase.config.ts";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const onLogout = () => {
        signOut(auth);
        setUser({
            user: null,
            userData: null
        });
        navigate("/log-in")
    }
    return (
        <Button
            colorScheme={"purple"}
            onClick={onLogout}
        >
            Log out
        </Button>
    );
}
export default Logout
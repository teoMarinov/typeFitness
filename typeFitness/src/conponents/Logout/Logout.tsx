import { Button, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.ts";
import { auth } from "../../config/firebase.config.ts";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    signOut(auth);
    setUser({
      user: null,
      userData: null,
    });
    navigate("/");
  };
  return (
    <>
      <Center pos="relative">
        <Button
          colorScheme={"green"}
          textColor={"white"}
          bg={"none"}
          onClick={onLogout}
          pos={"absolute"}
          left={"14px"}
          bottom="-15px"
        >
          Log out
        </Button>
      </Center>
    </>
  );
};
export default Logout;

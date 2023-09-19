/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../service/auth-service";
import image from "../../images/HD-Fitness-Backgrounds-For-Desktop.jpg";
import { Link as RouterLink } from "react-router-dom";
import {
  AbsoluteCenter,
  Center,
  Button,
  Input,
  Text,
  Link,
  VStack,
  Box,
} from "@chakra-ui/react";

const Login = () => {
  const [error, setError] = useState("");

  const navitage = useNavigate();
  const [form, setForm] = useState({
    handle: "",
    password: "",
  });

  const setUser = useContext(AuthContext);

  const updateForm =
    (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [prop]: e.target.value,
      });
    };

  const onLogin = async () => {
    if (!form.handle) return setError("Please enter a username!");
    if (!form.password) return setError("Please enter a password");

    try {
      const credential: any = await loginUser(form.handle, form.password);
      {
        setUser;
      }
      ({
        user: credential.user,
      });
    } catch (error: any) {
      console.log(error.message);
      if (error.message.includes("wrong-password")) {
        return setError("Wrong password!");
      }
      if (error.message.includes("User not found")) {
        return setError("User not found!");
      }
      if (error.message.includes("too-many-requests")) {
        return setError("Too many request. Try again later!");
      }
    }
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onLogin();
    }
  };
  return (
    <>
      <Box
        width="100%"
        height="100%"
        position={"fixed"}
        top="0"
        left="0"
        backgroundImage={image}
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex="-1"
      />
      <AbsoluteCenter onKeyDown={handleKeyDown}>
        <Box bg={"rgba(0,0,0,0.65)"} px={"40px"} py={"129px"} rounded={"xl"}>
          <Center>
            <Text fontSize={40} color={"white"}>
              Log In
            </Text>
          </Center>
          <VStack mt={"20px"} textColor={"white"}>
            <Input
              w={250}
              placeholder="Username"
              onChange={updateForm("handle")}
            />
            <Input
              w={250}
              type="password"
              placeholder="Password"
              onChange={updateForm("password")}
            />
          </VStack>
          <Center>
            {error && (
              <Text color="red" mr="6px">
                <strong>{error}</strong>{" "}
              </Text>
            )}
          </Center>
          <br />
          <Center>
            <Button colorScheme={"green"} onClick={onLogin}>
              Log in
            </Button>{" "}
            <br />
          </Center>
          <Center mt={"20px"} textColor="white">
            <Text mr="6px">Don't have an account?</Text>

            <Link as={RouterLink} to="/sign-up" color="blue.400">
              Sign Up
            </Link>
          </Center>
        </Box>
      </AbsoluteCenter>
    </>
  );
};

export default Login;

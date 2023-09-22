import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { color } from "framer-motion";

export default function GoToHomeButton() {
  return (
    <IconContext.Provider
      value={{ size: "65px", style: { color: "rgba(55,55,55, 0.89)" } }}
    >
      <NavLink to={"/"}>
        <Box pos={"fixed"} top={5} left={6}>
          <AiFillHome />
        </Box>
      </NavLink>
    </IconContext.Provider>
  );
}

import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { UpButton } from "./components/UpButton";
import { TopNavBar } from "./components/TopNavBar";
import { Outlet } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher position={"fixed"} right={0} top={0} />
    <UpButton position={"fixed"} bottom={0} right={0} />
    <TopNavBar />
    <Outlet />
  </ChakraProvider>
);

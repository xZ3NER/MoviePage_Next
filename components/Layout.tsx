import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { Navbar, Switch, SwitchEvent } from "@nextui-org/react";
import Link from "next/link";
import styles from "../styles/Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const themeChangeHandler = (event: SwitchEvent) => {
    console.log(event.target.checked);
  };

  return (
    <>
      <header>
        <Navbar isBordered style={{ position: "fixed", display: "unset" }} className={styles.nav}>
          <Link
            href={{
              pathname: "/",
              query: { page: 1 },
            }}
          >
            <Text className={styles["nav-item"]}>Home</Text>
          </Link>
          <Box display='flex' alignItems='center'>
            <Switch
              size='md'
              bordered
              iconOn={<MoonIcon />}
              iconOff={<SunIcon />}
              onChange={themeChangeHandler}
            />
          </Box>
        </Navbar>
      </header>
      {children}
    </>
  );
};

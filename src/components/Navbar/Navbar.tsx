"use client";

import { Button, Flex, ScrollArea } from "@mantine/core";


import type { NavItem } from "@/types/nav-item";
import { NavLinksGroup } from "./NavLinksGroup";
import classes from "./Navbar.module.css";
import {IconLogout2} from "@tabler/icons-react"
import { logoutUser } from "@/Data/actions/authAction";
interface Props {
  data: NavItem[];
  hidden?: boolean;
}

export function Navbar({ data }: Props) {
  const links = data.map((item) => (
    <NavLinksGroup key={item.label} {...item} />
  ));

  return (
    <>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}
          
        </div>

      
      </ScrollArea>
 <div className={classes.footer}>
  <Flex align="center" justify="center" p="lg">
        <Button
           variant="outline"
         
       
          onClick={async() => logoutUser()}
        >
          <IconLogout2/>
          </Button>
          </Flex>
      </div>
     
    </>
  );
}

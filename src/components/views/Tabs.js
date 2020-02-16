import React from "react";
import Container from "@material-ui/core/Container";
import Window from "../library/Window";
import Masonry from "../library/Masonry";
import useTabs from "../library/useTabs";

function Tabs() {
  const tabs = useTabs();

  console.log("TABS RENDER");

  return (
    <Container maxWidth="lg">
      <Masonry container>
        {tabs.all.map(group => (
          <Masonry item key={group.id}>
            <Window {...group} {...tabs} />
          </Masonry>
        ))}
      </Masonry>
    </Container>
  );
}

export default Tabs;

import React from "react";
import { newTab } from "../chrome";

function Popup() {
  return <div onClick={() => newTab("/dashboard")}>Go To Dashboard</div>;
}

export default Popup;

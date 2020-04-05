import React from "react";
import { center } from "./styles.module.css";
import Registration from "components/Registration";

const Home = () => {
  return (
    <div className={center}>
      <Registration />
    </div>
  );
};

export default Home;

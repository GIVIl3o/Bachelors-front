import React, { useContext } from "react";
import { layout, textClass, description } from "./styles.module.css";
import Registration from "components/Registration";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { UserContext } from "App";

const Home = ({ width }) => {
  const { text } = useContext(UserContext);

  return (
    <div className={layout}>
      {isWidthUp("sm", width) || <Registration />}
      <div className={textClass}>
        <h3>{text.site_slogan}</h3>
        <div className={description}>{text.site_description}</div>
      </div>
      {isWidthUp("sm", width) && <Registration />}
    </div>
  );
};

export default withWidth()(Home);

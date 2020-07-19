import React, { useContext } from "react";
import {
  layout,
  textClass,
  description,
  sloganText,
  descriptionText,
} from "./UnAuthenticated.module.css";
import Registration from "pages/Home/Registration";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { UserContext } from "App";

const Home = ({ width }) => {
  const { text } = useContext(UserContext);

  document.title = text.unauthorized_home_title;

  return (
    <div className={layout}>
      {isWidthUp("sm", width) || <Registration />}
      <div className={textClass}>
        <span className={sloganText}>{text.site_slogan}</span>
        <div className={description}>
          <span className={descriptionText}>{text.site_description}</span>
        </div>
      </div>
      {isWidthUp("sm", width) && <Registration />}
    </div>
  );
};

export default withWidth()(Home);

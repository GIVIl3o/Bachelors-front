import React, { useContext } from "react";
import { UserContext } from "App";

const Home = () => {
  const { setUsername } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("jwt");
    setUsername(undefined);
  };

  return (
    <div style={{ alignSelf: "baseline" }}>
      <input
        type="submit"
        onClick={logout}
        value="Logout"
        style={{ margin: "20px" }}
      />
    </div>
  );
};

export default Home;

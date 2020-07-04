import React from "react";
import { Button } from "@material-ui/core";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const ws = new SockJS("http://localhost:8080/websockets");
const t = Stomp.over(ws);
//const t = Stomp.client("ws://localhost:8080/websockets/websocket");

t.connect({ token: "t5es1t" }, () => {
  console.log("bla");
  t.subscribe("/topic/greetings", (m) => {
    console.log(m);
  });
});

const EditTaskComments = ({ task }) => {
  return (
    <Button
      onClick={() => {
        t.send("/hello", {}, "levan");
      }}
    >
      asd
    </Button>
  );
};

export default EditTaskComments;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

function RegisterType(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  // const onEmailHandler = (event) => {
  //   setEmail(event.currentTarget.value);
  // };
  // const onNameHandler = (event) => {
  //   setName(event.currentTarget.value);
  // };
  // const onPasswordHandler = (event) => {
  //   setPassword(event.currentTarget.value);
  // };
  // const onConfirmPasswordHandler = (event) => {
  //   setConfirmPassword(event.currentTarget.value);
  // };
  // const onSubmitHandler = (event) => {
  //   event.preventDefault();

  //   if (Password !== ConfirmPassword) {
  //     return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
  //   }

  //   let body = {
  //     email: Email,
  //     password: Password,
  //     name: Name,
  //   };

  //   dispatch(registerUser(body)).then((response) => {
  //     if (response.payload.success) {
  //       props.history.push("/login");
  //     } else {
  //       alert("Failed to sign up");
  //     }
  //   });
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ textAlign: "left" }}>가입유형을 선택하세요</Text>
        <Button
          style={{ width: "300px" }}
          block
          size="large"
          onClick={(event) => props.onClick(event, "user")}
        >
          개인
        </Button>
        <Button
          style={{ width: "300px" }}
          block
          size="large"
          onClick={(event) => props.onClick(event, "shop")}
        >
          사업주
        </Button>
      </div>
    </div>
  );
}

export default withRouter(RegisterType);

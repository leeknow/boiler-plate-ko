import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";

// import RegisterType from "./RegisterType";
// import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Typography } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
const { Text, Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function SearchPage(props) {
  const [step, setStep] = useState("type");
  const [type, setType] = useState("");

  const onTypeHandler = (event, type) => {
    console.log(">>>> ", event, type);
    setStep("regist");
    setType(type);
  };

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        // 제목
        shopName: "",
        // 주소
        address: "",
        // 연락처
        phoneNumber: "",
      }}
      validationSchema={Yup.object().shape({
        shopName: Yup.string().required("필수입니다"),
        address: Yup.string().required("필수입니다"),
        phoneNumber: Yup.string().required("필수입니다"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            shopName: values.shopName,
            address: values.address,
            phoneNumber: values.phoneNumber,
            // image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          // dispatch(registerUser(dataToSubmit)).then((response) => {
          //   if (response.payload.success) {
          //     props.history.push("/login");
          //   } else {
          //     alert(response.payload.err.errmsg);
          //   }
          // });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div
            className="app"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <Title level={3}>
                <Text type="danger">
                  사업장 검색시 고객에게 보이는 화면입니다.
                </Text>
              </Title> */}
              <Form
                style={{ width: "500px" }}
                {...formItemLayout}
                onSubmit={handleSubmit}
              >
                {/* <FileUpload refreshFunction={updateImages} /> */}
                <FileUpload />
                <Form.Item
                  label="제목"
                  required
                  validateStatus={
                    errors.shopName && touched.shopName ? "error" : "success"
                  }
                >
                  <Input
                    id="shopName"
                    placeholder="상호를 입력하세요"
                    type="text"
                    value={values.shopName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.shopName && touched.shopName
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.shopName && touched.shopName && (
                    <div
                      className="input-feedback"
                      style={{ textAlign: "left" }}
                    >
                      {errors.shopName}
                    </div>
                  )}
                </Form.Item>
                <Form.Item
                  label="주소"
                  required
                  validateStatus={
                    errors.address && touched.address ? "error" : "success"
                  }
                >
                  <Input
                    id="address"
                    placeholder="주소를 입력하세요"
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.address && touched.address
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.address && touched.address && (
                    <div
                      className="input-feedback"
                      style={{ textAlign: "left" }}
                    >
                      {errors.address}
                    </div>
                  )}
                </Form.Item>
                <Form.Item
                  label="전화번호"
                  required
                  validateStatus={
                    errors.phoneNumber && touched.phoneNumber
                      ? "error"
                      : "success"
                  }
                >
                  <Input
                    id="phoneNumber"
                    placeholder="전화번호를 입력하세요"
                    type="text"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.phoneNumber && touched.phoneNumber
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div
                      className="input-feedback"
                      style={{ textAlign: "left" }}
                    >
                      {errors.phoneNumber}
                    </div>
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    onClick={handleSubmit}
                    type="primary"
                    disabled={isSubmitting}
                    style={{ float: "left" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default SearchPage;

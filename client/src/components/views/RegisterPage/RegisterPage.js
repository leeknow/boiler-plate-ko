import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";

import RegisterType from "./RegisterType";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Typography } from "antd";
import Axios from "axios";
const { Text } = Typography;

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

function RegisterPage(props) {
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
        email: "",
        password: "",
        confirmPassword: "",
        // 상호
        shopName: "",
        // 사업자번호
        businessNumber: "",
        // 대표자명
        ceoName: "",
        // 개업일자:
        openingDate: "",
        // 주소
        address: "",
        // 연락처
        phoneNumber: "",
        // 정산계좌
        accountNumber: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),

        shopName: Yup.string().required("필수입니다"),
        businessNumber: Yup.string().required("필수입니다"),
        ceoName: Yup.string().required("필수입니다"),
        openingDate: Yup.string().required("필수입니다"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

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
              {step == "type" && <RegisterType onClick={onTypeHandler} />}
              {step == "regist" && (
                <Form
                  style={{ width: "500px" }}
                  {...formItemLayout}
                  onSubmit={handleSubmit}
                >
                  <Form.Item
                    required
                    label="Email"
                    // hasFeedback
                    validateStatus={
                      errors.email && touched.email ? "error" : "success"
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <Input
                          id="email"
                          placeholder="Enter your Email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.email && touched.email && (
                          <div
                            className="input-feedback"
                            style={{ textAlign: "left" }}
                          >
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          console.log(">>>>> start");
                          axios
                            .post(
                              `${process.env.REACT_APP_HOST}/api/users/register/auth`,
                              { a: 11111 },
                            )
                            .then((response) => {
                              console.log(">>>> end", response.data);
                            });
                        }}
                      >
                        인증
                      </Button>
                    </div>
                  </Form.Item>

                  <Form.Item
                    required
                    label="Password"
                    validateStatus={
                      errors.password && touched.password ? "error" : "success"
                    }
                  >
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.password && touched.password && (
                      <div
                        className="input-feedback"
                        style={{ textAlign: "left" }}
                      >
                        {errors.password}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label="Confirm"
                    validateStatus={
                      errors.confirmPassword && touched.confirmPassword
                        ? "error"
                        : "success"
                    }
                  >
                    <Input
                      id="confirmPassword"
                      placeholder="Enter your confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div
                        className="input-feedback"
                        style={{ textAlign: "left" }}
                      >
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Item>

                  {type == "shop" && (
                    <>
                      <Form.Item
                        required
                        label="상호"
                        validateStatus={
                          errors.shopName && touched.shopName
                            ? "error"
                            : "success"
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
                        required
                        label="사업자번호"
                        validateStatus={
                          errors.businessNumber && touched.businessNumber
                            ? "error"
                            : "success"
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <Input
                              id="businessNumber"
                              placeholder="사업자번호를 입력하세요"
                              type="text"
                              value={values.businessNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.businessNumber && touched.businessNumber
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.businessNumber && touched.businessNumber && (
                              <div
                                className="input-feedback"
                                style={{ textAlign: "left" }}
                              >
                                {errors.businessNumber}
                              </div>
                            )}
                          </div>
                          <Button>인증</Button>
                        </div>
                      </Form.Item>

                      <Form.Item
                        required
                        label="대표자명"
                        validateStatus={
                          errors.ceoName && touched.ceoName
                            ? "error"
                            : "success"
                        }
                      >
                        <Input
                          id="ceoName"
                          placeholder="대표자명을 입력하세요"
                          type="text"
                          value={values.ceoName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.ceoName && touched.ceoName
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.ceoName && touched.ceoName && (
                          <div
                            className="input-feedback"
                            style={{ textAlign: "left" }}
                          >
                            {errors.ceoName}
                          </div>
                        )}
                      </Form.Item>

                      <Form.Item
                        required
                        label="개업일자"
                        validateStatus={
                          errors.openingDate && touched.openingDate
                            ? "error"
                            : "success"
                        }
                      >
                        <Input
                          id="openingDate"
                          placeholder="개업일자 입력하세요"
                          type="date"
                          value={values.openingDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.openingDate && touched.openingDate
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.openingDate && touched.openingDate && (
                          <div
                            className="input-feedback"
                            style={{ textAlign: "left" }}
                          >
                            {errors.openingDate}
                          </div>
                        )}
                      </Form.Item>

                      <Form.Item label="주소">
                        <Input
                          placeholder="주소를 입력하세요"
                          type="text"
                          value={values.address}
                          className="text-input"
                        />
                      </Form.Item>

                      <Form.Item label="연락처">
                        <Input
                          placeholder="연락처를 입력하세요"
                          type="text"
                          value={values.phoneNumber}
                          className="text-input"
                        />
                      </Form.Item>

                      <Form.Item label="정산계좌">
                        <Input
                          placeholder="정산계좌를 입력하세요"
                          type="text"
                          value={values.phoneNumber}
                          className="text-input"
                        />
                      </Form.Item>
                    </>
                  )}
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
              )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;

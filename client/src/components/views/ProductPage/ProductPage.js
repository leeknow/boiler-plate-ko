import React, { useState } from "react";
import "./Sections/ProductPage.css";

import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Modal,
  Typography,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { Formik } from "formik";
import * as Yup from "yup";

const { Paragraph, Text } = Typography;

const formItemLayout = {
  labelCol: {
    // xs: { span: 24 },
    // sm: { span: 8 },
    xs: { span: 12 },
    sm: { span: 6 },
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

// YYYY-MM-DD
const toLocaleDate = function (d) {
  var m = d.getMonth() + 1;
  return [d.getFullYear(), m <= 9 ? "0" + m : m, d.getDate()].join("-");
};

function ProductPage(props) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(true);
  const [values, setValues] = useState(null);
  //   const [submit, setSubmit] = useState(null);

  return (
    <>
      <Row gutter={[24, 24]}>
        {products.map((p) => (
          <Col key={new Date().getTime()} className="gutter-row" span={4}>
            <div className="site-card-border-less-wrapper">
              <Badge size="default" count={5}>
                <Card
                  title={p.name}
                  bordered={false}
                  style={{ width: "200px", cursor: "pointer" }}
                  onClick={() => {
                    p.id = "" + new Date().getTime();
                    setValues(p);
                    setShowModal(true);
                  }}
                >
                  <Text>
                    {p.term} 개월, {p.price} 만원
                  </Text>
                  <Paragraph ellipsis={{ rows: 3 }}>{p.detail}</Paragraph>
                </Card>
              </Badge>
            </div>
          </Col>
        ))}
        <Col className="gutter-row" span={4}>
          <div
            className="site-card-border-less-wrapper"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            onClick={() => {
              setError(true);
              setValues(null);
              setShowModal(true);
            }}
          >
            <PlusCircleOutlined
              size="large"
              style={{ fontSize: "40px", color: "#08c", cursor: "pointer" }}
            />
          </div>
        </Col>
      </Row>
      <Modal
        key="modal"
        visible={showModal}
        centered="true"
        closable={false}
        destroyOnClose="true"
        title="상품정보"
        footer={[
          !!(values || {}).id ? (
            <Button
              key="del"
              onClick={() => {
                // TODO: service (promise)
                setProducts(
                  products.reduce((acc, p) => {
                    p.id != values.id && acc.push(p);
                    return acc;
                  }, []),
                );
                setShowModal(false);
              }}
            >
              삭제
            </Button>
          ) : null,
          <Button
            key="save"
            type="primary"
            // loading={loading}
            onClick={() => {
              if (!error && !!values.name && !!values.detail) {
                console.log(">>>>>> OK values", values);
                // TODO: 같은 조건의 상품이 있는지 중복체크를 한다(동일기간, 동일금액)
                // TODO: service (promise)
                !values.id
                  ? // 등록
                    setProducts([...products, values])
                  : // 수정
                    setProducts(
                      products.reduce((acc, p) => {
                        acc.push(p.id == values.id ? values : p);
                        return acc;
                      }, []),
                    );
                setShowModal(false);
              }
            }}
          >
            {!!(values || {}).id ? "수정" : "등록"}
          </Button>,
          <Button key="close" onClick={() => setShowModal(false)}>
            닫기
          </Button>,
        ].filter((e) => !!e)}
      >
        <Formik
          initialValues={
            values || {
              // 상품명
              name: "",
              // 상세
              detail: "",
              // 기간
              term: 1,
              // 가격(금액)
              price: 10,
              confirmPrice: 10,
              // 시작일자
              startDate: toLocaleDate(new Date()),
            }
          }
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(20, "20자리 이하로 등록하세요")
              .required("필수입니다"),
            detail: Yup.string()
              .max(500, "500자리 이하로 등록하세요")
              .required("필수입니다"),
            term: Yup.number()
              .required()
              .positive()
              .integer()
              .min(1)
              .max(36, "36개월 이하만 등록가능합니다"),
            price: Yup.number()
              .required()
              .positive()
              .integer()
              .max(1000, "최대 1000"),
            confirmPrice: Yup.number()
              .required("가격확인이 필요합니다")
              .oneOf([Yup.ref("price"), null], "동일한 가격을 입력하세요"),
            startDate: Yup.date()
              .required("필수입니다")
              .test("min", "현재일 이후만 입력가능합니다", (value) => {
                return toLocaleDate(value) >= toLocaleDate(new Date());
              }),
          })}
          //   onSubmit={(values, { setSubmitting }) => {}}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              //   handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            // 재정의
            const handleBlur = (value) => {
              console.log(">>>> errors", errors, touched);
              setError(Object.keys(errors).length > 0);
              setValues(values);
              return props.handleBlur(value);
            };
            // Modal
            // setSubmit(() => handleSubmit);
            // Render
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
                  <Form
                    style={{ width: "500px" }}
                    onSubmit={handleSubmit}
                    {...formItemLayout}
                  >
                    <Form.Item
                      required
                      label="상품명"
                      validateStatus={
                        errors.name && touched.name ? "error" : "success"
                      }
                    >
                      <Input
                        id="name"
                        placeholder="상품명을 입력하세요"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.name && touched.name && (
                        <div
                          className="input-feedback"
                          style={{ textAlign: "left" }}
                        >
                          {errors.name}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item
                      required
                      label="상세내역"
                      validateStatus={
                        errors.detail && touched.detail ? "error" : "success"
                      }
                    >
                      <Input.TextArea
                        id="detail"
                        placeholder="상세내역을 입력하세요 (최대 500자)"
                        type="text"
                        autoSize={{ minRows: 2, maxRows: 5 }}
                        maxLength={500}
                        allowClear={true}
                        value={values.detail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.detail && touched.detail
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.detail && touched.detail && (
                        <div
                          className="input-feedback"
                          style={{ textAlign: "left" }}
                        >
                          {errors.detail}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item
                      required
                      label="기간"
                      validateStatus={
                        errors.term && touched.term ? "error" : "success"
                      }
                    >
                      <Input
                        id="term"
                        placeholder="기간을 입력하세요"
                        suffix="개월"
                        type="number"
                        value={values.term}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.term && touched.term
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.term && touched.term && (
                        <div
                          className="input-feedback"
                          style={{ textAlign: "left" }}
                        >
                          {errors.term}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item
                      required
                      label="가격"
                      validateStatus={
                        errors.price && touched.price ? "error" : "success"
                      }
                    >
                      <Input
                        id="price"
                        placeholder="가격을 입력하세요"
                        prefix="₩"
                        suffix="만원"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.price && touched.price
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.price && touched.price && (
                        <div
                          className="input-feedback"
                          style={{ textAlign: "left" }}
                        >
                          {errors.price}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item
                      required
                      label="가격확인"
                      validateStatus={
                        errors.confirmPrice && touched.confirmPrice
                          ? "error"
                          : "success"
                      }
                    >
                      <Input
                        id="confirmPrice"
                        placeholder="같은 가격을 입력하세요"
                        prefix="₩"
                        suffix="만원"
                        type="number"
                        value={values.confirmPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.confirmPrice && touched.confirmPrice
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.confirmPrice && touched.confirmPrice && (
                        <div
                          className="input-feedback"
                          style={{ textAlign: "left" }}
                        >
                          {errors.confirmPrice}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item
                      required
                      label="판매시작일"
                      validateStatus={
                        errors.startDate && touched.startDate
                          ? "error"
                          : "success"
                      }
                    >
                      <Input
                        id="startDate"
                        placeholder="판매시작일을 입력하세요"
                        type="date"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.startDate && touched.startDate
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.startDate && touched.startDate && (
                        <div
                          className="input-feedback"
                          style={{ textAlign: "left" }}
                        >
                          {errors.startDate}
                        </div>
                      )}
                    </Form.Item>
                  </Form>
                </div>
              </div>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
}

export default ProductPage;

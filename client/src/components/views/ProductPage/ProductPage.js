import React, { useState } from "react";
import "./Sections/ProductPage.css";

import { Row, Col, Card, Badge, Button, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
// const { Text } = Typography;

function ProductPage(props) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Row gutter={[24, 24]}>
        {products.map((e) => (
          <Col className="gutter-row" span={4}>
            <div className="site-card-border-less-wrapper">
              <Badge size="default" count={5}>
                <Card
                  title="Card title"
                  bordered={false}
                  style={{ width: "200px" }}
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
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
            onClick={() => setShowModal(true)}
          >
            <PlusCircleOutlined
              size="large"
              style={{ fontSize: "40px", color: "#08c" }}
            />
          </div>
        </Col>
      </Row>
      <Modal
        visible={showModal}
        closable={false}
        title="상품정보"
        footer={[
          <Button key="back" onClick={() => true}>
            삭제
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            // onClick={this.handleOk}
          >
            저장
          </Button>,
          <Button onClick={() => setShowModal(false)}>닫기</Button>,
        ]}
      ></Modal>
    </>
  );
}

export default ProductPage;

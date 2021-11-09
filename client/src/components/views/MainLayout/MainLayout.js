import React, { Component } from "react";
import "./Sections/MainLayout.css";

import { Layout, Menu, Breadcrumb } from "antd";
import { Row, Col } from "antd";
import { Typography, Space } from "antd";
import { Input, Tooltip } from "antd";

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { InfoCircleOutlined /*, UserOutlined*/ } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Text, Link, Title } = Typography;
const { Search } = Input;

class MainLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Row>
            <Col span={16}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">?</Menu.Item>
                <Menu.Item key="2">이용방법</Menu.Item>
                <Menu.Item key="3">이벤트</Menu.Item>
              </Menu>
            </Col>
            <Col span={8}>
              <Row justify="end">
                <Menu theme="dark" mode="horizontal">
                  <Menu.Item key="4">회원가입</Menu.Item>
                  <Menu.Item key="5">로그인</Menu.Item>
                </Menu>
              </Row>
            </Col>
          </Row>
        </Header>
        <Layout style={{ height: "850px" }}>
          <Sider
            collapsed={false}
            width={200}
            className="site-layout-background"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="마이누리">
                <Menu.Item key="1">장부 및 정산</Menu.Item>
                <Menu.Item key="2">상품</Menu.Item>
                <Menu.Item key="3">홍보</Menu.Item>
                <Menu.Item key="4">게시판</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="기타">
                <Menu.Item key="5">회원정보</Menu.Item>
                <Menu.Item key="6">판매상품이력</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
              }}
              align="center"
              className="site-layout-background"
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Title level={2}>
                <Text type="danger">N A N U R I</Text>
              </Title>
              <Input
                style={{ width: 800 }}
                placeholder=" 사업장 또는 전화번호를 입력하세요."
                prefix={<SearchOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                size="large"
                maxLength={50}
              />
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ margin: "5 0 0 0", padding: "0" }}>
          <Row align="center" className="site-layout-background">
            Footer
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default MainLayout;

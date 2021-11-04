@import '~antd/dist/antd.css';

.menu {
  padding: 0 20px;
  border-bottom: solid 1px #e8e8e8;
  overflow: auto;
  box-shadow: 0 0 30px #f3f1f1;
  background-color: white;
}

.menu__logo {
  width: 150px;
  float: left;
}

.menu__logo a {
  display: inline-block;
  font-size: 20px;
  padding: 19px 20px;
}

.menu__container .ant-menu-item {
  padding: 0px 5px;
}

.menu__container .ant-menu-submenu-title {
  padding: 10px 20px;
}

.menu__container .ant-menu-item a,
.menu__container .ant-menu-submenu-title a {
  padding: 10px 15px;
}

.menu__container .ant-menu-horizontal {
  border-bottom: none;
}

.menu__container .menu_left {
  float: left;
}

.menu__container .menu_rigth {
  float: right;
}

.menu__mobile-button {
  float: right;
  height: 32px;
  padding: 6px;
  margin-top: 8px;
  display: none !important; /* use of important to overwrite ant-btn */
  background: #3e91f7;
}

.menu_drawer .ant-drawer-body {
  padding: 0 !important;
}

/* align header of Drawer with header of page */
.menu_drawer .ant-drawer-header {
  padding: 14px 24px !important;
}

@media (max-width: 767px) {
  .menu__mobile-button {
    display: inline-block !important;
  }

  .menu_left,
  .menu_rigth {
    display: none;
  }

  .menu__logo a {
    margin-left: -20px;
  }

  .menu__container .ant-menu-item,
  .menu__container .ant-menu-submenu-title {
    padding: 1px 20px;
  }

  .menu__logo a {
    padding: 10px 20px;
  }
}
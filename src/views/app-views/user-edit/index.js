import React, { Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  Row,
  Col,
  message,
  Upload,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class EditProfile extends Component {
  avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

  user = this.props.user;

  state = {
    id: this.user?.id || "",
    name: this.user?.name || "",
    username: this.user?.username || "",
    email: this.user?.email || "",
    address: this.user?.address || "",
    phone: this.user?.phone || "",
    website: this.user?.website || "",
    company: this.user?.company || "",
    img: this.user.img || "",
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const onFinish = (values) => {
      const key = "updatable";
      message.loading({ content: "Updating...", key });
      setTimeout(() => {
        this.setState({ ...this.state, values });
        message.success({ content: "Done!", key, duration: 2 });
        this.props.history.goBack();
      }, 1000);
    };

    const onFinishFailed = (errorInfo) => {
      console.error("Failed:", errorInfo);
    };

    const onUploadAvatar = (info) => {
      const key = "updatable";
      if (info.file.status === "uploading") {
        message.loading({ content: "Uploading...", key, duration: 1000 });
        return;
      }
      if (info.file.status === "done") {
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            avatarUrl: imageUrl,
          })
        );
        message.success({ content: "Uploaded!", key, duration: 1.5 });
      }
    };

    const onRemoveAvater = () => {
      this.setState({
        avatarUrl: "",
      });
    };

    const { name, username, email, company, phone, website, address, img } =
      this.state;

    return (
      <Card bodyStyle={{ padding: "5" }}>
        <Flex
          alignItems="center"
          mobileFlex={false}
          className="text-center text-md-left"
        >
          <Avatar size={90} src={img} icon={<UserOutlined />} />
          <div className="ml-md-3 mt-md-0 mt-3">
            <Upload
              onChange={onUploadAvatar}
              showUploadList={false}
              action={this.avatarEndpoint}
            >
              <Button type="primary">Изменить аватар</Button>
            </Upload>
            <Button className="ml-2" onClick={onRemoveAvater}>
              Удалить
            </Button>
          </div>
        </Flex>
        <div className="mt-4">
          <Form
            name="basicInformation"
            layout="vertical"
            initialValues={{
              name,
              username,
              email,
              company: company.name,
              phone,
              website,
              city: address.city,
              street: address.street,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Имя"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста введите имя!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Юзернейм"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста введите юзернейм!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Электронная почта"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Компания" name="company">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Телефон" name="phone">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Сайт" name="website">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Город" name="city">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Улица" name="street">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Сохранить изменения
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(withRouter(EditProfile));

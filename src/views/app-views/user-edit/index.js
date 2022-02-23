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
import { getUsers } from "redux/actions";
import Loading from "components/shared-components/Loading";

export class EditProfile extends Component {
  avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

  componentDidMount() {
    const { getUsers } = this.props;
    if (this.props.users.length === 0) {
      getUsers();
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const { isLoading } = this.props;

    const onFinish = (values) => {
      const key = "updatable";
      message.loading({ content: "Updating...", key });
      setTimeout(() => {
        this.setState({ ...this.state, values });
        message.success({ content: "Done!", key, duration: 2 });
        this.props.history.goBack();
      }, 2000);
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

    const user = this.props.users[this.props.match.params.id - 1];

    if (isLoading) {
      return <Loading />;
    }
    return (
      <Card bodyStyle={{ padding: "5" }}>
        <Flex
          alignItems="center"
          mobileFlex={false}
          className="text-center text-md-left"
        >
          <Avatar
            size={90}
            src={user.img || "/img/avatars/thumb-1.jpg"}
            icon={<UserOutlined />}
          />
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
              name: user?.name || "",
              username: user?.username || "",
              email: user?.email || "",
              company: user?.company.name || "",
              phone: user?.phone || "",
              website: user?.website || "",
              city: user?.address.city || "",
              street: user?.address.street || "",
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

const mapStateToProps = ({ users }) => {
  return { users: users.list, isLoading: users.isLoading };
};

const mapDispatchToProps = {
  getUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));

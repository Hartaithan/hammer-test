import React, { Component } from "react";
import { Card, Table, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Loading from "components/shared-components/Loading";
import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { withRouter } from "react-router-dom";
import { setUsers, getUsers } from "redux/actions/UsersList";
import { connect } from "react-redux";

export class UserList extends Component {
  state = {
    userProfileVisible: false,
    selectedUser: null,
  };

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  render() {
    const { userProfileVisible, selectedUser } = this.state;
    const { users, isLoading } = this.props;

    const tableColumns = [
      {
        title: "Пользователь",
        dataIndex: "name",
        render: (_, record) => (
          <div className="d-flex">
            <AvatarStatus
              src={record.img || `/img/avatars/thumb-1.jpg`}
              name={record.name}
              subTitle={record.email}
            />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Электронная почта",
        dataIndex: "email",
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Телефон",
        dataIndex: "phone",
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Адрес",
        dataIndex: "address",
        render: ({ city, street, suite }) => `${city}, ${street}, ${suite}`,
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right">
            <Tooltip title="Редактировать">
              <Button
                type="primary"
                className="mr-2"
                icon={<EditOutlined />}
                onClick={() => {
                  this.props.history.push("/app/clients/list/edit");
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Просмотреть">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Удалить">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <Table columns={tableColumns} dataSource={users} rowKey="id" />
        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            this.closeUserProfile();
          }}
        />
      </Card>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users: users.list, isLoading: users.isLoading };
};

const mapDispatchToProps = {
  setUsers,
  getUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserList));

import React, { useContext, useState } from 'react'
import { EditOutlined, DeleteOutlined, UserAddOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { AddUserForm, EditUserForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'
import { genders, userRoles } from '../services/userHelper'

const { Text, Title } = Typography;

const UsersTable = () => {
    const { state, deleteUser, getUsers } = useContext(GlobalContext)
    const [ newUserPopover, setNewUserPopover ] = useState(false)
    const [ editUserPopover, setEditUserPopover ] = useState(false)
    const [ details, setDetails ] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const deleteConfirm = (id) => {
        deleteUser(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const columns = [
    {
        title: () => (<b>First Name</b>),
        dataIndex: 'firstname',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.firstname.length - b.firstname.length,
        key: 'firstname'
    },
    {
        title: () => (<b>Last Name</b>),
        dataIndex: 'lastname',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.lastname.length - b.lastname.length,
        key: 'lastname'
    },
    {
        title: () => (<b>Username</b>),
        dataIndex: 'username',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.username.length - b.username.length,
        key: 'username'
    },
    {
        title: () => (<b>Role</b>),
        dataIndex: 'role',
        key: 'role',
        filters: userRoles.map(role => (
            {
                text: role.name,
                value: role.value
            }
        )),
        onFilter: (value, record) => record.role.indexOf(value) === 0
    },
    {
        title: () => (<b>Gender</b>),
        dataIndex: 'gender',
        key: 'gender',
        filters: genders.map(gender => (
            {
                text: gender.name,
                value: gender.value
            }
        )),
        onFilter: (value, record) => record.gender.indexOf(value) === 0
    },
    {
        title: () => (<b>Town</b>),
        dataIndex: 'town',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.town.length - b.town.length,
        key: 'town'
    },
    {
        title: () => (<b>Balance</b>),
        dataIndex: 'amountBalance',
        defaultSortOrder: 'descend',
        key: 'amountBalance',
        sorter: (a, b) => a.amountBalance - b.amountBalance
    },
    {
        title: () => (<b>Email</b>),
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.email.length - b.email.length,
        key: 'email'
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        fixed: 'right',
        render: (record) => (
            <Space size='middle'>
                <Popover
                    placement='bottomLeft'
                    content={ <EditUserForm user={details} />}
                    title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing User</b> <Button onClick={ () => setEditUserPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                    trigger='click'
                    visible={ editUserPopover && (record._id === details._id) }
                >
                    <Button className='edit-button' onClick={ () => onEdit(record) }>
                        <EditOutlined  />
                    </Button>
                </Popover>
                <Popconfirm
                    title="Are you sure to delete this user?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                    onConfirm={ () => deleteConfirm(record._id) }
                >
                    <Button className='delete-button'>
                        <DeleteOutlined  />
                    </Button>
                </Popconfirm>
            </Space>
        )
    }
    ]

    return (
        <React.Fragment>
            <div className="tools-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={ <AddUserForm />}
                        title= {() => (<Title level={2} className='add-user-title'><b>Add New User</b> <Button onClick={ () => setNewUserPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={ newUserPopover }
                    >
                        <Button className='add-button' onClick={ () => setNewUserPopover(true) }>
                            <UserAddOutlined  />  Add User
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={ () => getUsers() }>
                        <ReloadOutlined  /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={ (record) => record._id } scroll={scroll} className='table' columns={columns} dataSource={state.users} />
            </div>
            <div className="footer">
                { state.users.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.users.length } Users !!!</b>
                    </Text>
                )}
                { state.users.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Users !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default UsersTable

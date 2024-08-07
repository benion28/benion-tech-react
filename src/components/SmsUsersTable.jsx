import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddUserForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { smsUserFormRoles, smsGenders, firstCapital } from '../services/userHelper'

const { Text, Title } = Typography
const { Fragment } = React

const SmsUsersTable = () => {
    const { state, deleteSmsUser, getSmsUsers } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [users, setUsers] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialUser = {
        firstname: "",
        lastname: "",
        middlename: "",
        phone: "",
        address: "",
        email: "",
        image: "",
        gender: "",
        religion: "",
        dateofbirth: "",
        joiningdate: "",
        roles: [{ name: "" }],
        clientemail: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail
    }

    useEffect(() => {
        if (state.smsUser.roles[0] === "MODR") {
            const filteredUsers = state.smsUsers.filter(user => user.clientemail === state.smsUser.email)
            if (filteredUsers.length > 0) {
                setUsers(filteredUsers)
            }
        } else {
            setUsers(state.smsUsers)
        }
    }, [state.smsUsers, state.smsUser])

    console.log("State", state)


    const deleteConfirm = (id) => {
        deleteSmsUser(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
                <p style={{ marginBottom: 1 }}>
                    <b>First Name:</b> {record.firstname}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Middle Name:</b> {record.middlename}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Last Name:</b> {record.lastname}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Phone:</b> {record.phone}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Password:</b> {record.password}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Passcode:</b> {record.passcode ? record.passcode : ''}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Date of Birth:</b> {record.dateofbirth.slice(0, 10)}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Joining Date:</b> {record.joiningdate.slice(0, 10)}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Address:</b> {record.address}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
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
            title: () => (<b>Email</b>),
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
            key: 'email'
        },
        {
            title: () => (<b>Role</b>),
            dataIndex: 'roles',
            key: 'roles',
            filters: smsUserFormRoles.map(role => (
                {
                    text: firstCapital(role.name),
                    value: role.value
                }
            )),
            render: (roles) => firstCapital(roles[0].name),
            onFilter: (value, record) => record.roles[0].name.indexOf(value) === 0
        },
        {
            title: () => (<b>Gender</b>),
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => firstCapital(gender),
            filters: smsGenders.map(gender => (
                {
                    text: firstCapital(gender.name),
                    value: gender.value
                }
            )),
            onFilter: (value, record) => record.gender.indexOf(value) === 0
        },
        {
            title: () => (<b>Client Email</b>),
            dataIndex: 'clientemail',
            key: 'clientemail',
            filters: state.clients.map(item => (
                {
                    text: item.name,
                    value: item.email
                }
            )),
            onFilter: (value, record) => record.clientemail.indexOf(value) === 0
        },
        {
            title: () => (<b>Actions</b>),
            key: 'actions',
            fixed: 'right',
            render: (record) => (
                <Space size='middle'>
                    <Popover
                        placement='bottomLeft'
                        content={<SmsAddUserForm user={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing User</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={editUserPopover && (record.id === details.id)}
                    >
                        <Button className='edit-button' onClick={() => onEdit(record)}>
                            <EditOutlined />
                        </Button>
                    </Popover>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteConfirm(record.id)}
                    >
                        <Button className='delete-button'>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <Fragment>
            <div className="button-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAddUserForm user = { initialUser } />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New User</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <UserAddOutlined />  Add User
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getSmsUsers()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={users} />
            </div>
            <div className="footer">
                {users.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {users.length} Users !!!</b>
                    </Text>
                )}
                {users.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Users !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsUsersTable

import React, { useContext, useState } from 'react'
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { CbtAddForm, CbtEditUserForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/CbtUsersTable.scss'
import { getFullName, cbtClasses, cbtRoles, cbtSchools, genders, getClassName, getSchoolName, exportToExcel } from '../services/userHelper'

const { Text, Title } = Typography;

const CbtUsersTable = () => {
    const { state, deleteCbtUser, getCbtUsers } = useContext(GlobalContext)
    const [ newUserPopover, setNewUserPopover ] = useState(false)
    const [ editUserPopover, setEditUserPopover ] = useState(false)
    const [ details, setDetails ] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const deleteConfirm = (id) => {
        deleteCbtUser(id)
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
        title: () => (<b>Full Name</b>),
        dataIndex: 'username',
        defaultSortOrder: 'descend',
        sorter: (a, b) => getFullName(a.username, state.cbtUsers).length - getFullName(b.username, state.cbtUsers).length,
        key: 'fullname',
        render: (username) => getFullName(username, state.cbtUsers)
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
        filters: cbtRoles.map(role => (
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
        title: () => (<b>Access Code</b>),
        dataIndex: 'accessCode',
        defaultSortOrder: 'descend',
        key: 'accessCode',
        sorter: (a, b) => a.accessCode - b.accessCode
    },
    {
        title: () => (<b>Creator</b>),
        dataIndex: 'creator',
        defaultSortOrder: 'descend',
        key: 'creator',
        sorter: (a, b) => a.creator - b.creator
    },
    {
        title: () => (<b>Class</b>),
        dataIndex: 'className',
        key: 'className',
        filters: cbtClasses.map(className => (
            {
                text: className.name,
                value: className.value
            }
        )),
        onFilter: (value, record) => record.className.indexOf(value) === 0,
        render: (className) => getClassName(className)
    },
    {
        title: () => (<b>School</b>),
        dataIndex: 'school',
        key: 'school',
        filters: cbtSchools.map(school => (
            {
                text: school.name,
                value: school.value
            }
        )),
        onFilter: (value, record) => record.school.indexOf(value) === 0,
        render: (school) => getSchoolName(school)
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        fixed: 'right',
        render: (record) => (
            <Space size='middle'>
                <Popover
                    placement='bottomLeft'
                    content={ <CbtEditUserForm user={details} />}
                    title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Cbt User</b> <Button onClick={ () => setEditUserPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
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
            <div className="tools-container" style={{ display: 'flex', flexDirection: 'row' }}>
                { (state.cbtLoggedIn && state.cbtUser.role !== "student") && (
                    <div className="add-user" style={{ marginRight: '2pt'}}>
                        <Popover
                            placement='bottomRight'
                            content={ <CbtAddForm />}
                            title= {() => (<Title level={2} className='add-user-title'><b>Add New User</b> <Button onClick={ () => setNewUserPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                            trigger='click'
                            visible={ newUserPopover }
                        >
                            <Button className='add-button' onClick={ () => setNewUserPopover(true) }>
                                <UsergroupAddOutlined  />  Add Cbt User
                            </Button>
                        </Popover>
                    </div>
                )}
                { (state.cbtLoggedIn && state.cbtUser.role !== "student") && (
                    <div className="button-container" style={{ marginRight: '2pt'}}>
                        <Button className='get-button' onClick={ () => getCbtUsers() }>
                            <ReloadOutlined  /> Reload
                        </Button>
                    </div>
                )}
                { (state.cbtLoggedIn && state.cbtUser.role !== "student") && (
                    <div className="button-container">
                        <Button className='get-button' onClick={ () => exportToExcel(state.cbtUsers, 'Cbt_Users_Students') }>
                            <DownloadOutlined  /> Export Excel
                        </Button>
                    </div>
                )}
            </div>
            <div className="table-container">
                <Table rowKey={ (record) => record._id } scroll={scroll} className='table' columns={columns} dataSource={state.cbtUsers} />
            </div>
            <div className="footer">
                { state.cbtUsers.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.cbtUsers.length } Cbt Users !!!</b>
                    </Text>
                )}
                { state.cbtUsers.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Cbt Users !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default CbtUsersTable


import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddParentForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { smsGenders, firstCapital } from '../services/userHelper'

const { Text, Title } = Typography
const { Fragment } = React

const SmsParentsTable = () => {
    const { state, deleteParent, getParents } = useContext(GlobalContext)
    const [parents, setParents] = useState([])
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialParent = {
        first_name: "",
        last_name: "",
        gender: "",
        occupation: "",
        blood_group: "",
        religion: "",
        email: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        phone: "",
        address: "",
        short_bio: "",
        image_url: ""
    }

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredParents = state.parents.filter(parent => parent.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredParents = state.parents.filter(parent => parent.client_email === state.smsUser.email)
            }
            if (filteredParents.length > 0) {
                setParents(filteredParents)
            }
        } else {
            setParents(state.parents)
        }
    }, [state.parents, state.smsUser])


    const deleteConfirm = (id) => {
        deleteParent(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
                <p style={{ marginBottom: 1 }}>
                    <b>First Name:</b> {record.first_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Last Name:</b> {record.last_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Occupation:</b> {record.occupation}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Phone:</b> {record.phone}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Blood Group:</b> {record.blood_group}
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
            dataIndex: 'first_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.first_name.length - b.first_name.length,
            key: 'first_name'
        },
        {
            title: () => (<b>Last Name</b>),
            dataIndex: 'last_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.last_name.length - b.last_name.length,
            key: 'last_name'
        },
        {
            title: () => (<b>Email</b>),
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
            key: 'email'
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
            dataIndex: 'client_email',
            key: 'client_email',
            filters: state.clients.map(item => (
                {
                    text: item.name,
                    value: item.email
                }
            )),
            onFilter: (value, record) => record.client_email.indexOf(value) === 0
        },
        {
            title: () => (<b>Actions</b>),
            key: 'actions',
            fixed: 'right',
            render: (record) => (
                <Space size='middle'>
                    <Popover
                        placement='bottomLeft'
                        content={<SmsAddParentForm parent={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Parent</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={editUserPopover && (record.id === details.id)}
                    >
                        <Button className='edit-button' onClick={() => onEdit(record)}>
                            <EditOutlined />
                        </Button>
                    </Popover>
                    <Popconfirm
                        title="Are you sure to delete this parent?"
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
                        content={<SmsAddParentForm parent={initialParent} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Parent</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <UserAddOutlined />  Add Parent
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getParents()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={parents} />
            </div>
            <div className="footer">
                {parents.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {parents.length} Parents !!!</b>
                    </Text>
                )}
                {parents.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Parents !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsParentsTable

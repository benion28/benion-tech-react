import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, UserAddOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover, Badge } from 'antd'
import { SmsAddClientForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'
import { paymentStatus, planType } from '../services/userHelper'

const { Fragment } = React
const { Text, Title } = Typography

const initialClient = {
    name: "",
    email: "",
    phone: "",
    plan_type: "",
    image_url: "",
    plan_status: ""
}

const SmsClientsTable = () => {
    const { state, deleteUser, getUsers } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [clients, setClients] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    useEffect(() => {
        const fetchedClients = state.clients
        if (fetchedClients.length > 0) {
            setClients(fetchedClients)
        }
    }, [state.clients])

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
            title: () => (<b>Name</b>),
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name.length - b.name.length,
            key: 'name'
        },
        {
            title: () => (<b>Email</b>),
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
            key: 'email'
        },
        {
            title: () => (<b>Phone</b>),
            dataIndex: 'phone',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.phone.length - b.phone.length,
            key: 'phone'
        },
        {
            title: () => (<b>Type</b>),
            dataIndex: 'plan_type',
            key: 'plan_type',
            filters: planType.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.plan_type.indexOf(value) === 0
        },
        {
            title: () => (<b>Status</b>),
            dataIndex: 'plan_status',
            key: 'plan_status',
            render: (plan_status) => (
                <span>
                    {(plan_status === "paid" || plan_status === "completed") ? <Badge status="success" /> : <Badge status="warning" />} {plan_status}
                </span>
            ),
            filters: paymentStatus.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.plan_status.indexOf(value) === 0
        },
        {
            title: () => (<b>Client Email</b>),
            dataIndex: 'client_email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.client_email.length - b.client_email.length,
            key: 'client_email'
        },
        {
            title: () => (<b>Actions</b>),
            key: 'actions',
            fixed: 'right',
            render: (record) => (
                <Space size='middle'>
                    <Popover
                        placement='bottomLeft'
                        content={<SmsAddClientForm client={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Client</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={editUserPopover && (record.id === details.id)}
                    >
                        <Button className='edit-button' onClick={() => onEdit(record)}>
                            <EditOutlined />
                        </Button>
                    </Popover>
                    <Popconfirm
                        title="Are you sure to delete this client?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteConfirm(record._id)}
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
            <div className="tools-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAddClientForm client={initialClient} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Client</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <UserAddOutlined />  Add Client
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={() => getUsers()}>
                        <ReloadOutlined /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} dataSource={clients} />
            </div>
            <div className="footer">
                {clients.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {clients.length} Clients !!!</b>
                    </Text>
                )}
                {clients.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Clients !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsClientsTable

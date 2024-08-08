import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover, Badge } from 'antd'
import { SmsAddFeesCollectionForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'
import { feesType, getFeesCollectionFullName, getPaymentStatusName, getPaymentTypeName, getSmsClassName, paymentStatus, smsClasses } from '../services/userHelper'

const { Fragment } = React
const { Text, Title } = Typography

const SmsFeesCollectionTable = () => {
    const { state, deleteFeesCollection, getFeesCollections } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [feesCollections, setFeesCollections] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const initialFeesCollection = {
        first_name: "",
        admission_number: "",
        last_name: "",
        status: "",
        fees_date: "",
        due_date: "",
        expense_type: "",
        email: "",
        phone: "",
        amount: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        fees: "",
        gender: "",
        class_room: "",
        school_section: "",
        parent_email: ""
    };

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredFees = state.feesCollections.filter(feesCollection => feesCollection.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredFees = state.feesCollections.filter(feesCollection => feesCollection.client_email === state.smsUser.email)
            }
            if (filteredFees.length > 0) {
                setFeesCollections(filteredFees)
            }
        } else {
            setFeesCollections(state.feesCollections)
        }
    }, [state.feesCollections, state.smsUser])

    const deleteConfirm = (id) => {
        deleteFeesCollection(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
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
                    <b>Student Email:</b> {record.email}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Parent Email:</b> {record.parent_email}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Amount Paid:</b> {`₦${record.fees}`}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Total Amount:</b> {`₦${record.amount}`}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Payment Date:</b> {record.fees_date}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
    }

    const columns = [
        {
            title: () => (<b>Name</b>),
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
            render: (email) => getFeesCollectionFullName(email, state.feesCollections),
            key: 'email'
        },
        {
            title: () => (<b>Class</b>),
            dataIndex: 'class_room',
            key: 'class_room',
            render: (class_room) => getSmsClassName(class_room),
            filters: smsClasses.map(className => (
                {
                    text: className.name,
                    value: className.value
                }
            )),
            onFilter: (value, record) => record.class_room.indexOf(value) === 0
        },
        {
            title: () => (<b>Fees Paid</b>),
            dataIndex: 'fees',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Number(a.fees) - Number(b.fees),
            render: (fees) => `₦${fees}`,
            key: 'fees'
        },
        {
            title: () => (<b>Type</b>),
            dataIndex: 'expense_type',
            key: 'expense_type',
            render: (expense_type) => getPaymentTypeName(expense_type),
            filters: feesType.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.plan_type.indexOf(value) === 0
        },
        {
            title: () => (<b>Status</b>),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span>
                    {status === "completed" ? <Badge status="success" /> : <Badge status="warning" />} {getPaymentStatusName(status)}
                </span>
            ),
            filters: paymentStatus.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.status.indexOf(value) === 0
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
                        content={<SmsAddFeesCollectionForm feesCollection={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Fees Collection</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={editUserPopover && (record.id === details.id)}
                    >
                        <Button className='edit-button' onClick={() => onEdit(record)}>
                            <EditOutlined />
                        </Button>
                    </Popover>
                    <Popconfirm
                        title="Are you sure to delete this record?"
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
            <div className="tools-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAddFeesCollectionForm feesCollection={initialFeesCollection} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Fees Collection</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Fees Collection
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={() => getFeesCollections()}>
                        <ReloadOutlined /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} expandable={expandable} dataSource={feesCollections} />
            </div>
            <div className="footer">
                {feesCollections.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {feesCollections.length} Fees Collection !!!</b>
                    </Text>
                )}
                {feesCollections.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Fees Collection !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsFeesCollectionTable

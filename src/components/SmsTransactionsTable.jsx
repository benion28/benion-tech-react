import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover, Badge } from 'antd'
import { SmsAddTransactionForm } from '../components'
import { getSmsUserFullName } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'

const { Fragment } = React
const { Text, Title } = Typography

const SmsTransactionsTable = () => {
    const { state, deleteTransaction, getTransactions } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const initialTransaction = {
        reference: "",
        amount: "",
        senders_email: state.smsUser.email ? state.smsUser.email : "",
        recievers_email: "",
        recievers_first_name: "",
        recievers_last_name: "",
        customers_first_name: state.smsUser.firstname ? state.smsUser.firstname : "",
        customers_last_name: state.smsUser.lastname ? state.smsUser.lastname : "",
        paid_at: "",
        client_email: state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR" ? state.smsUser.email : state.smsUser.clientEmail
      };

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredTransactions = state.transactions.filter(transaction => transaction.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredTransactions = state.transactions.filter(transaction => transaction.client_email === state.smsUser.email)
            }
            if (filteredTransactions.length > 0) {
                setTransactions(filteredTransactions)
            }
        } else {
            setTransactions(state.transactions)
        }
    }, [state.transactions, state.smsUser])

    const deleteConfirm = (id) => {
        deleteTransaction(id)
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
                    <b>Reciever:</b> {record.recievers_first_name} {record.recievers_last_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Customer:</b> {record.customers_first_name} {record.customers_last_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Amount Paid:</b> {`₦${record.amount}`}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Channel:</b> {record.channel}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Currency:</b> {record.currency}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Payment Date:</b> {record.paid_at ? record.paid_at.slice(0, 10) : ""}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Created Date:</b> {record.created ? record.created.slice(0, 10) : ""}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
    }

    const columns = [
        {
            title: () => (<b>Sender</b>),
            dataIndex: 'senders_email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.senders_email.length - b.senders_email.length,
            render: (senders_email) => getSmsUserFullName(senders_email, state.smsUsers),
            key: 'senders_email'
        },
        {
            title: () => (<b>Reciever</b>),
            dataIndex: 'recievers_email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.recievers_email.length - b.recievers_email.length,
            render: (recievers_email) => getSmsUserFullName(recievers_email, state.smsUsers),
            key: 'recievers_email'
        },
        {
            title: () => (<b>Reference</b>),
            dataIndex: 'reference',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.reference.length - b.reference.length,
            key: 'reference'
        },
        {
            title: () => (<b>Amount</b>),
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Number(a.amount) - Number(b.amount),
            key: 'amount'
        },
        {
            title: () => (<b>Type</b>),
            dataIndex: 'type',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.type.length - b.type.length,
            key: 'type'
        },
        {
            title: () => (<b>Status</b>),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span>
                    {(status === "completed" || status === "success") ? <Badge status="success" /> : <Badge status="warning" />} {status}
                </span>
            ),
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.status.length - b.status.length,
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
                record.type === "manual" && (
                    <Space size='middle'>
                        <Popover
                            placement='bottomLeft'
                            content={<SmsAddTransactionForm transaction={details} />}
                            title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Transaction</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
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
            )
        }
    ]

    return (
        <Fragment>
            <div className="tools-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAddTransactionForm transaction={initialTransaction} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add Transaction</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Transaction
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={() => getTransactions()}>
                        <ReloadOutlined /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} expandable={expandable} dataSource={transactions} />
            </div>
            <div className="footer">
                {transactions.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {transactions.length} Transaction !!!</b>
                    </Text>
                )}
                {transactions.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Transaction !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsTransactionsTable

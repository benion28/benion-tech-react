import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover, Badge } from 'antd'
import { SmsAddExpenseForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'
import { expenseType, feesType, getExpenseTypeName, getFeesCollectionFullName, getPaymentStatusName, paymentStatus } from '../services/userHelper'

const { Fragment } = React
const { Text, Title } = Typography

const SmsExpensesTable = () => {
    const { state, deleteExpense, getExpenses } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [expenses, setExpenses] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const initialExpenses = {
        first_name: "",
        last_name: "",
        status: "",
        date_expense: "",
        expense_type: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        parent_email: "",
        phone: "",
        amount: ""
    };

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
      let filteredExpenses = state.expenses.filter(expense => expense.client_email === state.smsUser.clientEmail)
      if (state.smsUser.roles[0] === "MODR") {
        filteredExpenses = state.expenses.filter(expense => expense.client_email === state.smsUser.email)
      } else if (state.smsUser.roles[0] === "TEACHER") {
        const filteredTeacher = state.teachers.filter(teacher => teacher.email === state.smsUser.email)
        if (filteredTeacher.length > 0) {
          filteredExpenses = state.expenses.filter(expense => expense.parent_email === filteredTeacher[0].email)
        }
      }
      if (filteredExpenses.length > 0) {
        setExpenses(filteredExpenses)
      }
    } else {
      setExpenses(state.expenses)
    }
  }, [state.expenses, state.smsUser, state.teachers])

    const deleteConfirm = (id) => {
        deleteExpense(id)
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
                    <b>Email:</b> {record.parent_email}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Phone:</b> {record.phone}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Amount:</b> {`₦${record.amount}`}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Payment Date:</b> {record.date_expense}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
    }

    const columns = [
        {
            title: () => (<b>Name</b>),
            dataIndex: 'parent_email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.parent_email.length - b.parent_email.length,
            render: (parent_email) => getFeesCollectionFullName(parent_email, state.smsUser),
            key: 'parent_email'
        },
        {
            title: () => (<b>Amount</b>),
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Number(a.amount) - Number(b.amount),
            render: (amount) => `₦${amount}`,
            key: 'amount'
        },
        {
            title: () => (<b>Type</b>),
            dataIndex: 'expense_type',
            key: 'expense_type',
            render: (expense_type) => getExpenseTypeName(expense_type),
            filters: expenseType.map(item => (
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
                        content={<SmsAddExpenseForm expense={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Expense</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
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
                        content={<SmsAddExpenseForm expense={initialExpenses} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Expense</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Expense
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={() => getExpenses()}>
                        <ReloadOutlined /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} expandable={expandable} dataSource={expenses} />
            </div>
            <div className="footer">
                {expenses.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {expenses.length} Expenses !!!</b>
                    </Text>
                )}
                {expenses.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Expenses !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsExpensesTable

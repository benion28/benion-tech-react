import React, { useContext } from 'react'
import { DeleteOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography } from 'antd'
import millify from "millify"
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'

const { Text } = Typography;

const PaymentsTable = () => {
    const { state, deletePayment, getPayments } = useContext(GlobalContext)

    const deleteConfirm = (key) => {
        deletePayment(key)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={ { margin: 0} }>
                <p style={ { marginBottom: 1} }>
                    <b>Amount:</b> {record.amount} ({millify(record.amount)})
                </p>
                <p style={ { marginBottom: 1} }>
                    <b>Customer's Firstname:</b> {record.customersFirstName}
                </p>
                <p style={ { marginBottom: 1} }>
                    <b>Customer's Lastname:</b> {record.customersLastName}
                </p>
                <p style={ { marginBottom: 1} }>
                    <b>Customer's Email:</b> {record.customersEmail}
                </p>
                { state.cbtUser.role === "admin" && state.cbtLoggedIn && (
                    <hr></hr>
                )}
                { state.cbtUser.role === "admin" && state.cbtLoggedIn && (
                    <p style={ { marginBottom: 1} }>
                        <b>Currency:</b> {record.currency}
                    </p>
                )}
                { state.cbtUser.role === "admin" && state.cbtLoggedIn && (
                    <p style={ { marginBottom: 1} }>
                        <b>Sender's Email:</b> {record.sendersEmail}
                    </p>
                )}
                { state.cbtUser.role === "admin" && state.cbtLoggedIn && (
                    <p style={ { marginBottom: 1} }>
                        <b>Bank:</b> {record.bank}
                    </p>
                )}
            </div>
        ),
        rowExpandable: (record) => true
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const columns = [
        {
            title: () => (<b>Reference</b>),
            dataIndex: 'reference',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.reference.length - b.reference.length,
            key: 'reference'
        },
        {
            title: () => (<b>Reciever's Username</b>),
            dataIndex: 'recieversUsername',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.recieversUsername.length - b.recieversUsername.length,
            key: 'recieversUsername'
        },
        {
            title: () => (<b>Date</b>),
            dataIndex: 'date',
            defaultSortOrder: 'descend',
            key: 'date',
            sorter: (a, b) => a.date - b.date
        },
        {
            title: () => (<b>Amount</b>),
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount
        },
        {
            title: () => (<b>Channel</b>),
            dataIndex: 'channel',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.channel.length - b.channel.length,
            key: 'channel'
        },
        {
            title: () => (<b>Actions</b>),
            key: 'actions',
            fixed: 'right',
            render: (record) => (
                <Space size='middle'>
                    {((state.loggedIn && state.user.role === "admin" ) || ( state.cbtLoggedIn && state.cbtUser.role !== "student" )) && (
                        <Popconfirm
                            title="Are you sure to delete this exam?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                            onConfirm={ () => deleteConfirm(record.$key) }
                        >
                            <Button className='delete-button'>
                                <DeleteOutlined  />
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            )
        }
    ]

    return (
        <React.Fragment>
            <div className="button-container">
                <Button className='get-button' onClick={ () => getPayments() }>
                    <ReloadOutlined  /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={ (record) => record.$key } scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={state.payments[3]} />
            </div>
            <div className="footer">
                { state.payments[3].length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.payments[3].length } Payment Data !!!</b>
                    </Text>
                )}
                { state.payments[3].length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Payment Data !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default PaymentsTable

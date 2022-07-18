import React, { useContext } from 'react'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ContactMessagesTable.scss'

const { Text } = Typography;

const ContactMessagesTable = () => {
    const { state, deleteContactMessage } = useContext(GlobalContext)

    const deleteConfirm = (key) => {
        deleteContactMessage(key)
    }

    const columns = [
    {
        title: () => (<b>Full Name</b>),
        dataIndex: 'fullname',
        defaultSortOrder: 'descend',
        key: 'fullname'
    },
    {
        title: () => (<b>Message</b>),
        dataIndex: 'message',
        defaultSortOrder: 'descend',
        key: 'message'
    },
    {
        title: () => (<b>Email</b>),
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        key: 'email'
    },
    {
        title: () => (<b>Date</b>),
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        key: 'date'
    },
    {
        title: () => (<b>Time</b>),
        dataIndex: 'time',
        defaultSortOrder: 'descend',
        key: 'time'
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        render: (record) => (
            <Space size='middle'>
                <Popconfirm
                    title="Are you sure to delete this contact message?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                    onConfirm={ () => deleteConfirm(record.$key) }
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
            <div className="table-container">
                <Table rowKey={ (record) => record.$key } className='table' columns={columns} dataSource={state.contactMessages[3]} />
            </div>
            <div className="footer">
                { state.contactMessages[3].length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.contactMessages[3].length } Contact Messages !!!</b>
                    </Text>
                )}
                { state.contactMessages[3].length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Contact Messages !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default ContactMessagesTable

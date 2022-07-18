import React, { useContext } from 'react'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ContactMessagesTable.scss'

const { Text } = Typography;

 const examQuestions = [
    {
        id: '0', 
        question: 'asfgsdkjgdfjhjklfdhgawsdsdfgjklkmmbghfbnhfg',
        optionA: 'bfhgdf',
        optionB: 'gdsgfd',
        optionC: 'etergdf',
        optionD: 'asasfsdxcz',
        answer: 'bfhgdf'
    },
    {
        id: '1', 
        question: '1asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '1bfhgdf',
        optionB: '1gdsgfd',
        optionC: '1etergdf',
        optionD: '1asasfsdxcz',
        answer: '1etergdf'
    },
    {
        id: '2', 
        question: '2asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '2bfhgdf',
        optionB: '2gdsgfd',
        optionC: '2etergdf',
        optionD: '2asasfsdxcz',
        answer: '2bfhgdf'
    },
    {
        id: '3', 
        question: '3asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '3bfhgdf',
        optionB: '3gdsgfd',
        optionC: '3etergdf',
        optionD: '3asasfsdxcz',
        answer: '3gdsgfd'
    }
]

const contactMessages = [
    {
        $key: '0', 
        message: 'Hello i have something to say to you 1',
        fullname: 'Bernard Iorver',
        email: 'bernard.iorver@example.com',
        date: '1/12/1992',
        time: '1:50'
    },
    {
        $key: '1', 
        message: 'Hello i have something to say to you 2',
        fullname: 'Benion Iorver',
        email: 'benion.iorver@example.com',
        date: '20/11/1995',
        time: '13:00'
    },
    {
        $key: '2', 
        message: 'Hello i have something to say to you 3',
        fullname: 'Bemshima Iorver',
        email: 'bemshima.iorver@example.com',
        date: '15/6/1993',
        time: '10:22'
    }
]

const cbtLoggedIn = true
const examTimeLimit = 30
const cbtTimeSpent = 0
const completed = false

const TestArea = () => {
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
        title: () => (<b>Combined</b>),
        dataIndex: "dateTime",
        defaultSortOrder: 'descend',
        key: 'dateTime'
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
                <Table rowKey={ (record) => record.$key } className='table' columns={columns} dataSource={contactMessages} />
            </div>
            <div className="footer">
                { contactMessages.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { contactMessages.length } Contact Messages !!!</b>
                    </Text>
                )}
                { contactMessages.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Contact Messages !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default TestArea


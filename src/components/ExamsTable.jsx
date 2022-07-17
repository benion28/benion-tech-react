import React, { useContext } from 'react'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'

const { Text } = Typography;

const ExamsTable = () => {
    const { state, deleteExam } = useContext(GlobalContext)

    const deleteConfirm = (key) => {
        deleteExam(key)
    }

    const columns = [
    {
        title: () => (<b>Username</b>),
        dataIndex: 'username',
        defaultSortOrder: 'descend',
        key: 'username'
    },
    {
        title: () => (<b>Answered</b>),
        dataIndex: 'answered',
        defaultSortOrder: 'descend',
        key: 'answered'
    },
    {
        title: () => (<b>Answers</b>),
        dataIndex: 'answers',
        defaultSortOrder: 'descend',
        key: 'answers'
    },
    {
        title: () => (<b>Exam Time</b>),
        dataIndex: 'examTime',
        defaultSortOrder: 'descend',
        key: 'examTime',
        sorter: (a, b) => a.examTime - b.examTime
    },
    {
        title: () => (<b>Time Limit</b>),
        dataIndex: 'timeLimit',
        defaultSortOrder: 'descend',
        key: 'timeLimit',
        sorter: (a, b) => a.timeLimit - b.timeLimit
    },
    {
        title: () => (<b>Score</b>),
        dataIndex: 'score',
        defaultSortOrder: 'descend',
        key: 'score',
        sorter: (a, b) => a.score - b.score
    },
    {
        title: () => (<b>Completed</b>),
        dataIndex: 'completed',
        key: 'completed',
        filters: [
            {
                text: "False",
                value: false
            },
            {
                text: "True",
                value: true
            }
        ],
        onFilter: (value, record) => record.completed.indexOf(value) === 0
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        render: (record) => (
            <Space size='middle'>
                <Popconfirm
                    title="Are you sure to delete this exam?"
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
                <Table rowKey={ (record) => record.$key } className='table' columns={columns} dataSource={state.cbtExams[3]} />
            </div>
            <div className="footer">
                { state.cbtExams[3].length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.cbtExams[3].length } Exam Data !!!</b>
                    </Text>
                )}
                { state.cbtExams[3].length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Exam Data !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default ExamsTable

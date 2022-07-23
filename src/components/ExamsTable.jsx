import React, { useContext } from 'react'
import { DeleteOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Badge } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'

const { Text } = Typography;

const ExamsTable = () => {
    const { state, deleteExam, getCbtExams } = useContext(GlobalContext)

    const deleteConfirm = (key) => {
        deleteExam(key)
    }

    const columns = [
    {
        title: () => (<b>Username</b>),
        dataIndex: 'username',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.username.length - b.username.length,
        key: 'username'
    },
    {
        title: () => (<b>Answered</b>),
        dataIndex: 'answered',
        key: 'answered',
        render: (answered) => `${answered} (${answered.split(",").length} questions)`
    },
    {
        title: () => (<b>Answers</b>),
        dataIndex: 'answers',
        key: 'answers',
        render: (answers) => `${answers} (${answers.split(",").length} answers)`
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
        sorter: true,
        render: (completed) => (
          <span>
            {completed ? <Badge status="success" /> : <Badge status="warning" />} {completed.toString()} 
            </span>
        )
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        fixed: 'right',
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
            <div className="button-container">
                <Button className='get-button' onClick={ () => getCbtExams() }>
                    <ReloadOutlined  /> Reload
                </Button>
            </div>
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

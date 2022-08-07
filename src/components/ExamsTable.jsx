import React, { useContext } from 'react'
import { DeleteOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Badge } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { getCategoryName, getClassName, getSubjectName, getTermName } from '../services/userHelper'

const { Text } = Typography;

const ExamsTable = () => {
    const { state, deleteExam, getCbtExams } = useContext(GlobalContext)

    const deleteConfirm = (key) => {
        deleteExam(key)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={ { margin: 0} }>
                <p style={ { marginBottom: 1} }>
                    <b>Subject:</b> {getSubjectName(record.subject)}
                </p>
                <p style={ { marginBottom: 1} }>
                    <b>Term:</b> {getTermName(record.term)}
                </p>
                <p style={ { marginBottom: 1} }>
                    <b>Class:</b> {getClassName(record.className)}
                </p>
                <p style={ { marginBottom: 1} }>
                    <b>Category:</b> {getCategoryName(record.category)}
                </p>
                <hr></hr>
                <p style={ { marginBottom: 1} }>
                    <b>Answered Questions:</b> <i>{record.answered}</i> ({record.answered.split(",").length} questions) 
                </p>
                <hr></hr> 
                <p style={ { marginTop: 1} }>
                    <b>Selected Answers:</b> <i>{record.answers}</i> ({record.answers.split(",").length} answers)
                </p>
            </div>
        ),
        rowExpandable: (record) => record.completed
    }

    const getFullName = (username) => {
        const cbtUser = state.cbtUsers.filter(user => user.username === username)
        return `${cbtUser[0].firstname} ${cbtUser[0].lastname}`
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const columns = [
        {
            title: () => (<b>Full Name</b>),
            dataIndex: 'username',
            defaultSortOrder: 'descend',
            sorter: (a, b) => getFullName(a.username).length - getFullName(b.username).length,
            key: 'fullname',
            render: (username) => getFullName(username)
        },
        {
            title: () => (<b>Username</b>),
            dataIndex: 'username',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.username.length - b.username.length,
            key: 'username'
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
                <Table rowKey={ (record) => record.$key } scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={state.cbtExams[3]} />
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

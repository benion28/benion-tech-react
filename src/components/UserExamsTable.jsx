import React, { useContext, useEffect, useState } from 'react'
import { DeleteOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Badge } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { getCategoryName, getClassName, getUtmeSubjectName, getTermName, getFullName } from '../services/userHelper'

const { Text } = Typography
const { Fragment } = React

const UserExamsTable = ({ self }) => {
    const { state, deleteUtmeExam, getUtmeExams } = useContext(GlobalContext)
    const [examResults, setExamResults] = useState([])

    useEffect(() => {
        let filteredExam = state.utmeExams[3]
        if (self) {
            filteredExam = state.utmeExams[3].filter(record => record.username === state.tempCbtUsername)
        }
        setExamResults(filteredExam)
    }, [state.utmeExams, state.tempCbtUsername, self])


    const deleteConfirm = (key) => {
        deleteUtmeExam(key)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
                <p style={{ marginBottom: 1 }}>
                    <b>{getUtmeSubjectName(record.subject1)}:</b> {record.score1}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>{getUtmeSubjectName(record.subject2)}:</b> {record.score2}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>{getUtmeSubjectName(record.subject3)}:</b> {record.score3}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>{getUtmeSubjectName(record.subject4)}:</b> {record.score4}
                </p>
                <hr></hr>
                <p style={{ marginBottom: 1 }}>
                    <b>Answered Questions:</b> <i>{record.answered}</i> ({record.answered.split(",").length} questions)
                </p>
                <hr></hr>
                <p style={{ marginTop: 1 }}>
                    <b>Selected Answers:</b> <i>{record.answers}</i> ({record.answers.split(",").length} answers)
                </p>
            </div>
        ),
        rowExpandable: (record) => record.completed
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
            sorter: (a, b) => getFullName(a.username, state.cbtUsers).length - getFullName(b.username, state.cbtUsers).length,
            key: 'fullname',
            render: (username) => getFullName(username, state.cbtUsers)
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
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteConfirm(record.$key)}
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
            <div className="button-container">
                <Button className='get-button' onClick={() => getUtmeExams()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.$key} scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={examResults} />
            </div>
            <div className="footer">
                {examResults.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {examResults.length} Exam Data !!!</b>
                    </Text>
                )}
                {examResults.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Exam Data !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default UserExamsTable

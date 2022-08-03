import React, { useContext, useState } from 'react'
import { EditOutlined, DeleteOutlined, UserAddOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { AddScoreForm, EditScoreForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ScoresTable.scss'
import { sessions, terms, subjects, cbtClasses, getSubjectName, getClassName, getTermName } from '../services/userHelper'

const { Text, Title } = Typography;

const ScoresTable = () => {
    const { state, deleteScore, getScores } = useContext(GlobalContext)
    const [ newScorePopover, setNewScorePopover ] = useState(false)
    const [ editScorePopover, setEditScorePopover ] = useState(false)
    const [ details, setDetails ] = useState({ $key: 'gfsgdfgdew4rrewtr5e' })

    const deleteConfirm = (key) => {
        deleteScore(key)
    }

    const onEdit = (user) => {
        setEditScorePopover(true)
        setDetails(user)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={ { margin: 0} }>
                <p style={ { marginBottom: 2} }>
                    <b>1st CA:</b> {record.firstCA} <span style={ { marginRight: 190, marginLeft: 190} }><b>2nd CA:</b> {record.secondCA}</span> <b>Exam:</b> {record.exam}
                </p>
                <hr></hr> 
                <p style={ { marginTop: 2} }>
                    <b>Total:</b> {record.total} <span style={ { marginRight: 200, marginLeft: 200} }><b>Grade:</b> {record.grade}</span> <b>Comment:</b> {record.comment}
                </p>
            </div>
        ),
        rowExpandable: (record) => record.total > 1
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const columns = [
        {
            title: () => (<b>Full Name</b>),
            dataIndex: 'fullname',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.fullname.length - b.fullname.length,
            key: 'fullname'
        },
        {
            title: () => (<b>Session</b>),
            dataIndex: 'session',
            key: 'session',
            filters: sessions.map(session => (
                {
                    text: session.name,
                    value: session.value
                }
            )),
            onFilter: (value, record) => record.session.indexOf(value) === 0
        },
        {
            title: () => (<b>Term</b>),
            dataIndex: 'term',
            key: 'term',
            filters: terms.map(term => (
                {
                    text: term.name,
                    value: term.value
                }
            )),
            onFilter: (value, record) => record.term.indexOf(value) === 0,
            render: (term) => getTermName(term)
        },
        {
            title: () => (<b>Class</b>),
            dataIndex: 'className',
            key: 'className',
            filters: cbtClasses.map(className => (
                {
                    text: className.name,
                    value: className.value
                }
            )),
            onFilter: (value, record) => record.className.indexOf(value) === 0,
            render: (className) => getClassName(className)
        },
        {
            title: () => (<b>Subject</b>),
            dataIndex: 'subject',
            key: 'subject',
            filters: subjects.map(subject => (
                {
                    text: subject.name,
                    value: subject.value
                }
            )),
            onFilter: (value, record) => record.subject.indexOf(value) === 0,
            render: (subject) => getSubjectName(subject)
        },
        {
            title: () => (<b>Total</b>),
            dataIndex: 'total',
            defaultSortOrder: 'descend',
            key: 'total',
            sorter: (a, b) => a.total - b.total
        },
        {
            title: () => (<b>Actions</b>),
            key: 'actions',
            fixed: 'right',
            render: (record) => (
                <Space size='middle'>
                    {(state.cbtUser.accessCode === record.examiner || state.user.role === "admin") && (
                        <Popover
                            placement='bottomLeft'
                            content={ <EditScoreForm user={details} />}
                            title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Score</b> <Button onClick={ () => setEditScorePopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                            trigger='click'
                            visible={ editScorePopover && (record.$key === details.$key) }
                        >
                            <Button className='edit-button' onClick={ () => onEdit(record) }>
                                <EditOutlined  />
                            </Button>
                        </Popover>
                    )}
                    {(state.cbtUser.accessCode === record.examiner || state.user.role === "admin") && (
                        <Popconfirm
                            title="Are you sure to delete this user?"
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
            <div className="tools-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={ <AddScoreForm />}
                        title= {() => (<Title level={2} className='add-user-title'><b>Add New Student's Score</b> <Button onClick={ () => setNewScorePopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={ newScorePopover }
                    >
                        <Button className='add-button' onClick={ () => setNewScorePopover(true) }>
                            <UserAddOutlined  />  Add Score
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={ () => getScores() }>
                        <ReloadOutlined  /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={ (record) => record.$key } scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={state.scores[3]} />
            </div>
            <div className="footer">
                { state.scores[3].length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.scores[3].length } Scores !!!</b>
                    </Text>
                )}
                { state.scores[3].length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Score Data !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default ScoresTable

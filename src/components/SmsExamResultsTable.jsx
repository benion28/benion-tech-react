import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddExamResultForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'
import { getSmsClassName, getSmsSubjectName, smsClasses, smsSubjects } from '../services/userHelper'

const { Fragment } = React
const { Text, Title } = Typography

const SmsExamResultsTable = () => {
    const { state, deleteExamResult, getExamResults } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [examResults, setExamResults] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const initialExamResult = {
    subject: "",
    grade_name: "",
    percentage_from: "",
    percentage_score: "",
    result_date: "",
    student_email: "",
    student_name: "",
    class_name: "",
    school_section: "",
    comment: "",
    grade_point: "",
    client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
    mark: 0,
    ca: 0,
    term: "",
    student_admission_number: "",
    teacher_email: "",
    parent_email: ""
  };

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredExamResults = state.examResults.filter(examResult => examResult.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredExamResults = state.examResults.filter(examResult => examResult.client_email === state.smsUser.email)
            } else if (state.smsUser.roles[0] === "PARENT") {
                filteredExamResults = state.examResults.filter(examResult => examResult.parent_email === state.smsUser.email)
            } else if (state.smsUser.roles[0] === "TEACHER") {
                const clientSelect = state.examResults.filter(examResult => examResult.client_email === state.smsUser.clientEmail)
                const filteredTeacher = state.teachers.filter(teacher => teacher.email === state.smsUser.email)
                if (filteredTeacher.length > 0) {
                    filteredExamResults = clientSelect.filter(examResult => examResult.class_name === filteredTeacher[0].class_room)
                }
            } else {
                filteredExamResults = state.examResults.filter(examResult => examResult.student_email === state.smsUser.email)
            }
            if (filteredExamResults.length > 0) {
                setExamResults(filteredExamResults)
            }
        } else {
            setExamResults(state.examResults)
        }
    }, [state.examResults, state.smsUser, state.teachers])

    const deleteConfirm = (id) => {
        deleteExamResult(id)
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
                    <b>Student Name:</b> {record.student_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Admission No:</b> {record.student_admission_number}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Student Email:</b> {record.student_email}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Parent Email:</b> {record.parent_email}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Session:</b> {record.school_section}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>CA:</b> {record.ca}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Exam:</b> {record.mark}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Total:</b> {record.ca + record.mark}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Percentage Score:</b> {record.percentage_score}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Grade Point:</b> {record.grade_point}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Grade Name:</b> {record.grade_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Comment:</b> {record.comment}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
    }

    const columns = [
        {
            title: () => (<b>Student Name</b>),
            dataIndex: 'student_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.student_name.length - b.student_name.length,
            key: 'student_name'
        },
        {
            title: () => (<b>Class</b>),
            dataIndex: 'class_name',
            key: 'class_name',
            render: (class_name) => getSmsClassName(class_name),
            filters: smsClasses.map(className => (
                {
                    text: className.name,
                    value: className.value
                }
            )),
            onFilter: (value, record) => record.class_name.indexOf(value) === 0
        },
        {
            title: () => (<b>Subject</b>),
            dataIndex: 'subject',
            key: 'subject',
            render: (subject) => getSmsSubjectName(subject),
            filters: smsSubjects.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.subject.indexOf(value) === 0
        },
        {
            title: () => (<b>CA</b>),
            dataIndex: 'ca',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.ca.length - b.ca.length,
            key: 'ca'
        },
        {
            title: () => (<b>Exam</b>),
            dataIndex: 'mark',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.mark.length - b.mark.length,
            key: 'mark'
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
                        content={<SmsAddExamResultForm examResult={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Exam Result</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
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
                        content={<SmsAddExamResultForm examResult={initialExamResult} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Exam Result</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Exam Result
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={() => getExamResults()}>
                        <ReloadOutlined /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} expandable={expandable} dataSource={examResults} />
            </div>
            <div className="footer">
                {examResults.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {examResults.length} Exam Results !!!</b>
                    </Text>
                )}
                {examResults.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Exam Results !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsExamResultsTable

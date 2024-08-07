import React, { useContext, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, UserAddOutlined, QuestionCircleOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover, Badge } from 'antd'
import { SmsAddExamScheduleForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/UsersTable.scss'
import { feesType, getFeesCollectionFullName, getPaymentStatusName, getPaymentTypeName, getSmsClassName, getSmsSubjectName, getTeacherFullName, paymentStatus, smsClasses, smsSubjects } from '../services/userHelper'

const { Fragment } = React
const { Text, Title } = Typography

const SmsExamScheduleTable = () => {
    const { state, deleteExamSchedule, getExamSchedules } = useContext(GlobalContext)
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [examSchedules, setExamSchedules] = useState([])
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ _id: 'gfsgdfgdew4rrewtr5e' })

    const initialExamSchedules = {
        exam_name: "",
        subject_type: "",
        select_class: "",
        select_date: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        select_section: "",
        select_time: "",
        teacher_email: "",
        teacher_name: ""
    }

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredExamSchedules = state.examSchedules.filter(examSchedule => examSchedule.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredExamSchedules = state.examSchedules.filter(examSchedule => examSchedule.client_email === state.smsUser.email)
            } else if (state.smsUser.roles[0] === "TEACHER" || state.smsUser.roles[0] === "STUDENT") {
                const clientSelect = state.examSchedules.filter(examSchedule => examSchedule.client_email === state.smsUser.clientEmail)
                if (state.smsUser.roles[0] === "TEACHER") {
                    const filteredTeacher = state.teachers.filter(teacher => teacher.email === state.smsUser.email)
                    if (filteredTeacher.length > 0) {
                        filteredExamSchedules = clientSelect.filter(schedule => schedule.select_class === filteredTeacher[0].class_room)
                    }
                } else {
                    const filteredStudent = state.students.filter(student => student.email === state.smsUser.email)
                    if (filteredStudent.length > 0) {
                        filteredExamSchedules = clientSelect.filter(schedule => schedule.select_class === filteredStudent[0].class_name)
                    }
                }
            }
            if (filteredExamSchedules.length > 0) {
                setExamSchedules(filteredExamSchedules)
            }
        } else {
            setExamSchedules(state.examSchedules)
        }
    }, [state.examSchedules, state.students, state.teachers, state.smsUser])

    const deleteConfirm = (id) => {
        deleteExamSchedule(id)
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
                    <b>Teacher Name:</b> {getTeacherFullName(record.teacher_email, state.teachers)}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Teacher Email:</b> {record.teacher_email}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Session:</b> {record.select_section}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Exam Time:</b> {record.select_time}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Exam Date:</b> {record.select_date}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
    }

    const columns = [
         {
            title: () => (<b>Exam Name</b>),
            dataIndex: 'exam_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.exam_name.length - b.exam_name.length,
            key: 'exam_name'
        },
        {
            title: () => (<b>Subject</b>),
            dataIndex: 'subject_type',
            key: 'subject_type',
            render: (subject_type) => getSmsSubjectName(subject_type),
            filters: smsSubjects.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.subject_type.indexOf(value) === 0
        },
        {
            title: () => (<b>Class</b>),
            dataIndex: 'select_class',
            key: 'select_class',
            render: (select_class) => getSmsClassName(select_class),
            filters: smsClasses.map(className => (
                {
                    text: className.name,
                    value: className.value
                }
            )),
            onFilter: (value, record) => record.select_class.indexOf(value) === 0
        },
        {
            title: () => (<b>Teacher</b>),
            dataIndex: 'teacher_email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.teacher_email.length - b.teacher_email.length,
            render: (teacher_email) => getTeacherFullName(teacher_email, state.teachers),
            key: 'teacher_email'
        },
        {
            title: () => (<b>Date</b>),
            dataIndex: 'select_date',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.select_date - b.select_date,
            render: (select_date) => select_date.slice(0, 10),
            key: 'select_date'
        },
        {
            title: () => (<b>Time</b>),
            dataIndex: 'select_time',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.select_time - b.select_time,
            key: 'select_time'
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
                        content={<SmsAddExamScheduleForm examSchedule={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Exam Schedule</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
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
                        content={<SmsAddExamScheduleForm examSchedule={initialExamSchedules} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Exam Schedule</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <UserAddOutlined />  Add Exam Schedule
                        </Button>
                    </Popover>
                </div>
                <div className="button-container">
                    <Button className='get-button' onClick={() => getExamSchedules()}>
                        <ReloadOutlined /> Reload
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} expandable={expandable} dataSource={examSchedules} />
            </div>
            <div className="footer">
                {examSchedules.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {examSchedules.length} Exam Schedules !!!</b>
                    </Text>
                )}
                {examSchedules.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Exam Schedules !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsExamScheduleTable

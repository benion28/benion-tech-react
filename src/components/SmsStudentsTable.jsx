import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAdmitStudentForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { smsClasses, smsGenders, firstCapital, getSmsClassName } from '../services/userHelper'

const { Text, Title } = Typography
const { Fragment } = React

const SmsStudentsTable = () => {
    const { state, deleteStudent, getStudents } = useContext(GlobalContext)
    const [students, setStudents] = useState([])
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialStudent = {
        first_name: "",
        last_name: "",
        father_name: "",
        gender: "",
        date_of_birth: "",
        blood_group: "",
        religion: "",
        email: "",
        class_name: "",
        section: "",
        admission_date: "",
        mothers_phone: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        phone: "",
        address: "",
        image: "",
        short_bio: "",
        parent_email: "",
        discount: 0,
        admission_number: "",
    }

    useEffect(() => {
        const clientSelect = state.students.filter(student => student.client_email === state.smsUser.clientEmail)
        if (state.smsUser.roles[0] === "TEACHER") {
            const filteredTeachers = state.teachers.filter(teacher => teacher.email === state.smsUser.email)[0]
            const stateFilteredStudents = clientSelect.filter(student => student.class_name === filteredTeachers.class_room)
            if (stateFilteredStudents.length > 0) {
                setStudents(stateFilteredStudents)
            }
        } else if (state.smsUser.roles[0] === "MODR") {
            const filteredStudents = state.students.filter(student => student.client_email === state.smsUser.email)
            if (filteredStudents.length > 0) {
                setStudents(filteredStudents)
            }
        } else {
            const fetchedStudents = state.students
            if (fetchedStudents.length > 0) {
                setStudents(fetchedStudents)
            }
        }
    }, [state.students, state.teachers, state.smsUser])


    const deleteConfirm = (id) => {
        deleteStudent(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const expandable = {
        expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
                <p style={{ marginBottom: 1 }}>
                    <b>First Name:</b> {record.first_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Last Name:</b> {record.last_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Father's Name:</b> {record.father_name}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Admission Number:</b> {record.admission_number}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Phone:</b> {record.phone}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Blood Group:</b> {record.blood_group}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Date of Birth:</b> {record.date_of_birth.slice(0, 10)}
                </p>
            </div>
        ),
        rowExpandable: (record) => record
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const columns = [
        {
            title: () => (<b>First Name</b>),
            dataIndex: 'first_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.first_name.length - b.first_name.length,
            key: 'first_name'
        },
        {
            title: () => (<b>Last Name</b>),
            dataIndex: 'last_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.last_name.length - b.last_name.length,
            key: 'last_name'
        },
        {
            title: () => (<b>Student No</b>),
            dataIndex: 'admission_number',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.admission_number.length - b.admission_number.length,
            key: 'admission_number'
        },
        {
            title: () => (<b>Email</b>),
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
            key: 'email'
        },
        {
            title: () => (<b>Gender</b>),
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => firstCapital(gender),
            filters: smsGenders.map(gender => (
                {
                    text: firstCapital(gender.name),
                    value: gender.value
                }
            )),
            onFilter: (value, record) => record.gender.indexOf(value) === 0
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
                        content={<SmsAdmitStudentForm student={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Student</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={editUserPopover && (record.id === details.id)}
                    >
                        <Button className='edit-button' onClick={() => onEdit(record)}>
                            <EditOutlined />
                        </Button>
                    </Popover>
                    <Popconfirm
                        title="Are you sure to delete this student?"
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
            <div className="button-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAdmitStudentForm student={initialStudent} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Admit New Student</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <UserAddOutlined />  Admit Student
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getStudents()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={students} />
            </div>
            <div className="footer">
                {students.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {students.length} Students !!!</b>
                    </Text>
                )}
                {students.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Students !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsStudentsTable

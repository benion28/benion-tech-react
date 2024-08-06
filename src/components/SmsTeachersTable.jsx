import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddTeacherForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { smsClasses, smsGenders, firstCapital, subjects } from '../services/userHelper'

const { Text, Title } = Typography
const { Fragment } = React

const SmsTeachersTable = () => {
    const { state, deleteTeacher, getTeachers } = useContext(GlobalContext)
    const [teachers, setTeachers] = useState([])
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialTeacher = {
        first_name: "",
        last_name: "",
        subject: "",
        gender: "",
        date_of_birth: "",
        joining_date: "",
        religion: "",
        email: "",
        class_room: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        section: "",
        address: "",
        phone: "",
        short_bio: "",
        blood_group: "",
        image_url: ""
    };

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredTeachers = state.teachers.filter(teacher => teacher.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredTeachers = state.teachers.filter(teacher => teacher.client_email === state.smsUser.email)
            }
            if (filteredTeachers.length > 0) {
                setTeachers(filteredTeachers)
            }
        } else {
            setTeachers(state.teachers)
        }
    }, [state.teachers, state.smsUser])


    const deleteConfirm = (id) => {
        deleteTeacher(id)
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
                    <b>Religion:</b> {record.religion}
                </p>
                <p style={{ marginBottom: 1 }}>
                    <b>Session:</b> {record.section}
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
            render: (gender) => gender.toLowerCase(),
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
            dataIndex: 'class_room',
            key: 'class_room',
            filters: smsClasses.map(className => (
                {
                    text: className.name,
                    value: className.value
                }
            )),
            onFilter: (value, record) => record.class_room.indexOf(value) === 0
        },
        {
            title: () => (<b>Subject</b>),
            dataIndex: 'subject',
            key: 'subject',
            filters: subjects.map(item => (
                {
                    text: item.name,
                    value: item.value
                }
            )),
            onFilter: (value, record) => record.subject.indexOf(value) === 0
        },
        {
            title: () => (<b>Client Email</b>),
            dataIndex: 'client_email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.client_email.length - b.client_email.length,
            key: 'client_email'
        },
        {
            title: () => (<b>Actions</b>),
            key: 'actions',
            fixed: 'right',
            render: (record) => (
                <Space size='middle'>
                    <Popover
                        placement='bottomLeft'
                        content={<SmsAddTeacherForm teacher={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Teacher</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={editUserPopover && (record.id === details.id)}
                    >
                        <Button className='edit-button' onClick={() => onEdit(record)}>
                            <EditOutlined />
                        </Button>
                    </Popover>
                    <Popconfirm
                        title="Are you sure to delete this teacher?"
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
                        content={<SmsAddTeacherForm teacher={initialTeacher} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Teacher</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <UserAddOutlined />  Add Teacher
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getTeachers()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' expandable={expandable} columns={columns} dataSource={teachers} />
            </div>
            <div className="footer">
                {teachers.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {teachers.length} Teachers !!!</b>
                    </Text>
                )}
                {teachers.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Teachers !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsTeachersTable

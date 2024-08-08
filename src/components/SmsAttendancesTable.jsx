import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddAttendanceForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'
import { getMonthName, getNumbersArray, getSmsClassName, getStudentFullName, months } from '../services/userHelper'

const { Text, Title } = Typography
const { Fragment } = React

const date = new Date()

const initialFilter = {
    class_name: "ss1",
    year: String(date.getFullYear()),
    month: months[date.getMonth()].value,
    session: "2023/2024",
    days: 30
}

const initialValues = {
    year: String(date.getFullYear()),
    day: String(date.getDate()),
    month: months[date.getMonth()].value,
    session: "2024/2025"
}

const SmsAttendancesTable = () => {
    const { state, deleteAttendance, getAttendances, getStudents } = useContext(GlobalContext)
    const [attendances, setAttendances] = useState([])
    const [students, setStudents] = useState([])
    const [currentStudent, setCurrentStudent] = useState({ admission_number: "", class_name: "" })
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [selectedFilter, setSeletedFilter] = useState(initialFilter)
    const [headerText, setHeaderText] = useState(`Attendence Sheet of ${getSmsClassName(selectedFilter.class_name)} Class, ${getMonthName(selectedFilter.month)} ${selectedFilter.year} (${selectedFilter.session})`)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialAttendance = {
        first_name: "",
        last_name: "",
        father_name: "",
        student_number: "",
        email: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        select_day: initialValues.day,
        class_name: "",
        select_year: initialValues.year,
        select_month: initialValues.month,
        select_section: initialValues.session,
        status: ""
    };

    useEffect(() => {
        getStudents()
        getAttendances()
        let fetchedStudents = []

        if (state.smsUser.roles[0] !== "ADMIN") {
            if (state.smsUser.roles[0] === "MODR") {
                fetchedStudents = state.students.filter(student => (student.client_email === state.smsUser.email) && (student.class_name === selectedFilter.class_name))
                if (fetchedStudents.length > 0) {
                    setStudents(fetchedStudents)
                }
            } else {
                fetchedStudents = state.students.filter(student => (student.client_email === state.smsUser.clientEmail) && (student.class_name === selectedFilter.class_name))
                if (fetchedStudents.length > 0) {
                    setStudents(fetchedStudents)
                }
            }
        } else {
            setStudents(state.students.filter(student => (student.class_name === selectedFilter.class_name)))
        }

        if (state.smsUser.roles[0] === "STUDENT") {
            const filteredStudent = state.students.filter(student => student.email === state.smsUser.email)
            if (filteredStudent.length > 0) {
                setCurrentStudent(filteredStudent[0])
            }
        }

        const fetchedAttendances = state.attendances
        if (fetchedAttendances.length > 0) {
            setAttendances(fetchedAttendances)
        }

        const filteredSearch = months.filter((month) => month.value === selectedFilter.month)[0]
        setSeletedFilter({ class_name: selectedFilter.class_name, year: selectedFilter.year, month: selectedFilter.month, days: filteredSearch.days, session: selectedFilter.session })
    }, [selectedFilter.month, state.students, getStudents, getAttendances, state.attendances, selectedFilter, state.smsUser])



    const deleteConfirm = (id) => {
        deleteAttendance(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const daysColumn = getNumbersArray(selectedFilter.days).map((day) => (
        {
            title: () => (<b>{String(day)}</b>),
            dataIndex: String(day),
            defaultSortOrder: 'descend',
            render: (day) => day,
            key: String(day)
        }
    ))

    console.log("daysColumn", daysColumn)

    const columns = [
        {
            title: () => (<b>{state.smsUser.roles[0] === "STUDENT" ? "Months" : "Students"}</b>),
            dataIndex: state.smsUser.roles[0] === "STUDENT" ? 'name' : 'email',
            defaultSortOrder: 'descend',
            render: state.smsUser.roles[0] === "STUDENT" ? (name) => name : (email) => getStudentFullName(email, state.students),
            key: state.smsUser.roles[0] === "STUDENT" ? 'name' : 'email'
        },
        ...daysColumn
    ]

    return (
        <Fragment>
            <div className="button-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAddAttendanceForm attendance={initialAttendance} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Class Attendance</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Class Attendance
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getAttendances()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} dataSource={state.smsUser.roles[0] === "STUDENT" ? months : students} />
            </div>
            <div className="footer">
                {attendances.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {attendances.length} Class Attendaces !!!</b>
                    </Text>
                )}
                {attendances.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Class Attendaces !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsAttendancesTable

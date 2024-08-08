import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddHostelForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'

const { Text, Title } = Typography
const { Fragment } = React

const SmsHostelsTable = () => {
    const { state, deleteHostel, getHostels } = useContext(GlobalContext)
    const [hostels, setHostels] = useState([])
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialHostel = {
        hostel_name: "",
        room_number: "",
        room_type: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        number_of_bed: "",
        cost_per_bed: ""
    };

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredHostels = state.hostels.filter(hostel => hostel.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredHostels = state.hostels.filter(hostel => hostel.client_email === state.smsUser.email)
            }
            if (filteredHostels.length > 0) {
                setHostels(filteredHostels)
            }
        } else {
            setHostels(state.hostels)
        }
    }, [state.hostels, state.smsUser])


    const deleteConfirm = (id) => {
        deleteHostel(id)
    }

    const onEdit = (user) => {
        setEditUserPopover(true)
        setDetails(user)
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const columns = [
        {
            title: () => (<b>Hostel Name</b>),
            dataIndex: 'hostel_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.hostel_name.length - b.hostel_name.length,
            key: 'hostel_name'
        },
        {
            title: () => (<b>Room No</b>),
            dataIndex: 'room_number',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.room_number.length - b.room_number.length,
            key: 'room_number'
        },
        {
            title: () => (<b>Room Type</b>),
            dataIndex: 'room_type',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.room_type.length - b.room_type.length,
            key: 'room_type'
        },
        {
            title: () => (<b>No of Beds</b>),
            dataIndex: 'number_of_bed',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Number(a.number_of_bed) - Number(b.number_of_bed),
            key: 'number_of_bed'
        },
        {
            title: () => (<b>Cost Per Bed</b>),
            dataIndex: 'cost_per_bed',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Number(a.cost_per_bed) - Number(b.cost_per_bed),
            key: 'cost_per_bed'
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
                        content={<SmsAddHostelForm hostel={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Hostel</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
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
            <div className="button-container">
                <div className="add-user">
                    <Popover
                        placement='bottomRight'
                        content={<SmsAddHostelForm hostel={initialHostel} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Hostel</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Hostel
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getHostels()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} dataSource={hostels} />
            </div>
            <div className="footer">
                {hostels.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {hostels.length} Hostels !!!</b>
                    </Text>
                )}
                {hostels.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Hostels !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsHostelsTable

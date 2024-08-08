import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Popover } from 'antd'
import { SmsAddTransportForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ExamsTable.scss'

const { Text, Title } = Typography
const { Fragment } = React

const SmsTransportsTable = () => {
    const { state, deleteTransport, getTransports } = useContext(GlobalContext)
    const [transports, setTransports] = useState([])
    const [newUserPopover, setNewUserPopover] = useState(false)
    const [editUserPopover, setEditUserPopover] = useState(false)
    const [details, setDetails] = useState({ id: 'gfsgdfgdew4rrewtr5e' })

    const initialTransport = {
        route_name: "",
        vehicle_number: "",
        driver_name: "",
        license_number: "",
        client_email: (state.smsUser.roles[0] === "ADMIN" || state.smsUser.roles[0] === "MODR") ? state.smsUser.email : state.smsUser.clientEmail,
        phone_number: ""
    }

    useEffect(() => {
        if (state.smsUser.roles[0] !== "ADMIN") {
            let filteredTransports = state.transports.filter(transport => transport.client_email === state.smsUser.clientEmail)
            if (state.smsUser.roles[0] === "MODR") {
                filteredTransports = state.transports.filter(transport => transport.client_email === state.smsUser.email)
            }
            if (filteredTransports.length > 0) {
                setTransports(filteredTransports)
            }
        } else {
            setTransports(state.transports)
        }
    }, [state.transports, state.smsUser])


    const deleteConfirm = (id) => {
        deleteTransport(id)
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
            title: () => (<b>Route Name</b>),
            dataIndex: 'route_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.route_name.length - b.route_name.length,
            key: 'route_name'
        },
        {
            title: () => (<b>Vehicle No</b>),
            dataIndex: 'vehicle_number',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.vehicle_number.length - b.vehicle_number.length,
            key: 'vehicle_number'
        },
        {
            title: () => (<b>Driver Name</b>),
            dataIndex: 'driver_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.driver_name.length - b.driver_name.length,
            key: 'driver_name'
        },
        {
            title: () => (<b>Driver Phone</b>),
            dataIndex: 'phone_number',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.phone_number.length - b.phone_number.length,
            key: 'phone_number'
        },
        {
            title: () => (<b>License No</b>),
            dataIndex: 'license_number',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.license_number.length - b.license_number.length,
            key: 'license_number'
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
                        content={<SmsAddTransportForm transport={details} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Transport</b> <Button onClick={() => setEditUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
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
                        content={<SmsAddTransportForm transport={initialTransport} />}
                        title={() => (<Title level={2} className='add-user-title'><b>Add New Transport</b> <Button onClick={() => setNewUserPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                        trigger='click'
                        visible={newUserPopover}
                    >
                        <Button className='add-button' onClick={() => setNewUserPopover(true)}>
                            <PlusOutlined />  Add Transport
                        </Button>
                    </Popover>
                </div>
                <Button className='get-button' onClick={() => getTransports()}>
                    <ReloadOutlined /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={(record) => record.id} scroll={scroll} className='table' columns={columns} dataSource={transports} />
            </div>
            <div className="footer">
                {transports.length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are {transports.length} Transports !!!</b>
                    </Text>
                )}
                {transports.length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Transports !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default SmsTransportsTable

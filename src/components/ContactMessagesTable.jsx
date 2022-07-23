import React, { useContext, useRef, useState } from 'react'
import { DeleteOutlined, QuestionCircleOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Input } from 'antd'
import Highlighter from 'react-highlight-words'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ContactMessagesTable.scss'

const { Text } = Typography;

const ContactMessagesTable = () => {
    const { state, deleteContactMessage, getContactMessages } = useContext(GlobalContext)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null)

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
            style={{
            padding: 8,
            }}
        >
            <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
                marginBottom: 8,
                display: 'block',
            }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                width: 90,
                }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                width: 90,
                }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({
                    closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
                }}
            >
                Filter
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => (
        <SearchOutlined
            style={{
            color: filtered ? '#1890ff' : undefined,
            }}
        />
        ),
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
            highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
    })

    const deleteConfirm = (key) => {
        deleteContactMessage(key)
    }

    const columns = [
    {
        title: () => (<b>Full Name</b>),
        dataIndex: 'fullname',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.fullname.length - b.fullname.length,
        key: 'fullname'
    },
    {
        title: () => (<b>Message</b>),
        dataIndex: 'message',
        defaultSortOrder: 'descend',
        key: 'message',
        ...getColumnSearchProps('message')
    },
    {
        title: () => (<b>Email</b>),
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.email.length - b.email.length,
        key: 'email'
    },
    {
        title: () => (<b>Date</b>),
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.date.length - b.date.length,
        key: 'date'
    },
    {
        title: () => (<b>Time</b>),
        dataIndex: 'time',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.time.length - b.time.length,
        key: 'time'
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        fixed: 'right',
        render: (record) => (
            <Space size='middle'>
                <Popconfirm
                    title="Are you sure to delete this contact message?"
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
                <Button className='get-button' onClick={ () => getContactMessages() }>
                    <ReloadOutlined  /> Reload
                </Button>
            </div>
            <div className="table-container">
                <Table rowKey={ (record) => record.$key } className='table' columns={columns} dataSource={state.contactMessages[3]} />
            </div>
            <div className="footer">
                { state.contactMessages[3].length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.contactMessages[3].length } Contact Messages !!!</b>
                    </Text>
                )}
                { state.contactMessages[3].length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Contact Messages !!!</b>
                    </Text>
                )}
            </div>
        </React.Fragment>
    )
}

export default ContactMessagesTable

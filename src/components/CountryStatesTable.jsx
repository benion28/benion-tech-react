import React, { useContext, useRef, useState } from 'react'
import { CloseOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, Typography, Input, Popover } from 'antd'
import Highlighter from 'react-highlight-words'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ContactMessagesTable.scss'
import { exportToExcel } from '../services/userHelper'
import { CountryStateForm } from '../components'

const { Text, Title } = Typography
const { Fragment } = React;

const defaultItem = {
    name: '',
    countryName: ''
};

const CountryStatesTable = () => {
    const { state, deleteCountryState, getCountryStates } = useContext(GlobalContext)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null)
    const [ newItemPopover, setNewItemPopover ] = useState(false)
    const [ editItemPopover, setEditItemPopover ] = useState(false)
    const [ details, setDetails ] = useState({ $key: 'gfsgdfgdew4rrewtr5e' })

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const scroll = {
        x: 'calc(500px + 50%)',
        y: 240
    }

    const onEdit = (item) => {
        setEditItemPopover(true)
        setDetails(item)
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
        deleteCountryState(key)
    }

    const columns = [
    {
        title: () => (<b>Name</b>),
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name.length - b.name.length,
        key: 'name'
    },
    {
        title: () => (<b>Country</b>),
        dataIndex: 'countryName',
        defaultSortOrder: 'descend',
        key: 'countryName',
        ...getColumnSearchProps('countryName')
    },
    {
        title: () => (<b>Created At</b>),
        dataIndex: 'createdAt',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.createdAt.length - b.createdAt.length,
        key: 'createdAt',
        render: (createdAt) => createdAt.split("T")[0]
    },
    {
        title: () => (<b>Updated At</b>),
        dataIndex: 'updatedAt',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
        key: 'updatedAt',
        render: (updatedAt) => updatedAt.split("T")[0]
    },
    {
        title: () => (<b>Actions</b>),
        key: 'actions',
        fixed: 'right',
        render: (record) => (
            <Space size='middle'>
                <Popover
                    placement='bottomLeft'
                    content={ <CountryStateForm item={details} />}
                    title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Item</b> <Button onClick={ () => setEditItemPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                    trigger='click'
                    visible={ editItemPopover && (record.$key === details.$key) }
                >
                    <Button className='edit-button' onClick={ () => onEdit(record) }>
                        <EditOutlined  />
                    </Button>
                </Popover>
                <Popconfirm
                    title="Are you sure to delete this item?"
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
        <Fragment>
            <div className="tools-container" style={{ display: 'flex', flexDirection: 'row' }}>
                { (state.loggedIn && state.user.role !== "guest") && (
                    <div className="add-user" style={{ marginRight: '2pt'}}>
                        <Popover
                            placement='bottomRight'
                            content={ <CountryStateForm item={defaultItem} />}
                            title= {() => (<Title level={2} className='add-user-title'><b>Add New Item</b> <Button onClick={ () => setNewItemPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                            trigger='click'
                            visible={ newItemPopover }
                        >
                            <Button className='add-button' onClick={ () => setNewItemPopover(true) }>
                                <PlusOutlined  />  Add Item
                            </Button>
                        </Popover>
                    </div>
                )}
                { (state.loggedIn && state.user.role !== "guest") && (
                    <div className="button-container" style={{ marginRight: '2pt'}}>
                        <Button className='get-button' onClick={ () => getCountryStates() }>
                            <ReloadOutlined  /> Reload
                        </Button>
                    </div>
                )}
                { (state.loggedIn && state.user.role !== "guest") && (
                    <div className="button-container">
                        <Button className='get-button' onClick={ () => exportToExcel(state.countryStates[3], 'Country_States') }>
                            <DownloadOutlined  /> Export Excel
                        </Button>
                    </div>
                )}
            </div>
            <div className="table-container">
                <Table rowKey={ (record) => record.$key } scroll={scroll} className='table' columns={columns} dataSource={state.countryStates[3]} />
            </div>
            <div className="footer">
                { state.countryStates[3].length > 0 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are { state.countryStates[3].length } Items !!!</b>
                    </Text>
                )}
                { state.countryStates[3].length < 1 && (
                    <Text className='footer-text' level={1}>
                        <b>Currently there are no Items !!!</b>
                    </Text>
                )}
            </div>
        </Fragment>
    )
}

export default CountryStatesTable

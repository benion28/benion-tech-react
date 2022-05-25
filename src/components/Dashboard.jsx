import React, { useState, useContext } from 'react'
import { Typography, Menu, Dropdown, Button, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { DownOutlined, SmileOutlined, LogoutOutlined, TableOutlined, MoneyCollectOutlined, LoginOutlined } from '@ant-design/icons';
import Loader from 'react-loaders'
import { UsersTable } from '../components'
import '../styles/Dashboard.scss'
import { GlobalContext } from '../app/GlobalState'
import { formatAmount } from '../services/userHelper';


const { Title } = Typography;
const { TabPane } = Tabs;

const Dashboard = () => {
    const [showTable, setShowTable] = useState(false)
    const { user, loggedIn, userLogout } = useContext(GlobalContext)
    // const data = {
    //     _id: 'fjsnklgs89pi0iojfk344930[',
    //     firstname: 'Bernard',
    //     lastname: 'Iorver',
    //     email: 'bernard.iorver28@gmail.com',
    //     username: 'benion',
    //     amountBalance: 300,
    //     gender: 'male',
    //     role: 'admin',
    //     birthday: '2002-10-14',
    //     town: 'Kaduna'
    // }
    const menuItems = [
        {
            label: (
                <div>
                    <Title level={5}>
                        <MoneyCollectOutlined /> <b>Account Balance: </b>
                    </Title>
                    <Title className="user-amount" level={2}>
                        ${ user.amountBalance !== null ? formatAmount(user.amountBalance) : formatAmount(8828) }
                    </Title>
                </div>
            )
        },
        {
            type: 'divider',
        },
        {
            label: user.role === 'admin' && (
                <Button className="dropdown-menu-button" onClick={() => setShowTable(true) }>
                    <TableOutlined />
                    Admin Tables
                </Button>
            )
        },
        {
            label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
            )
        },
        {
            type: 'divider',
        },
        {
            danger: true,
            label: loggedIn && (
                <Button className="dropdown-menu-button" onClick={() => userLogout }>
                    <LogoutOutlined />
                    Log Out
                </Button>
            )
        },
        {
            label: !loggedIn && (
                <Link to="/login">
                    <Button className="dropdown-menu-button">
                        <LoginOutlined />
                        Log In
                    </Button>
                </Link>
            )
        }
    ]

    return (
        <React.Fragment>
            <div className="heading">
                <Title level={2} className="text">User Dashboard ({ user.role === 'admin' ? 'Admin' : 'Guest' })</Title>
                <div className="dropdown">
                    <Title level={1} className="text-avatar">
                        <span className='text-span'>
                            { user.token !== null ? (user.firstname[0].toUpperCase()).concat(user.lastname[0].toUpperCase()) : 'GU' }
                        </span>
                    </Title>
                    <Dropdown overlay={<Menu items={ menuItems } />}>
                        <a href='/' onClick={e => e.preventDefault()}>
                            <Title level={4} className="dropdown-text">
                                { user.username !== null ? user.username : 'guest' }  <DownOutlined />
                            </Title>
                        </a>
                    </Dropdown>
                </div>
            </div>
            { showTable && (
                <div className="tables">
                    <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Users</Title> </span> } key="1">
                            <UsersTable />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Students</Title> </span> } key="2">
                            <h1>Students</h1>
                        </TabPane>
                    </Tabs>
                </div>
            )}
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Dashboard


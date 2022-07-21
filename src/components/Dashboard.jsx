import React, { useState, useContext } from 'react'
import { Typography, Menu, Dropdown, Button, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { DownOutlined, SmileOutlined, LogoutOutlined, TableOutlined, MoneyCollectOutlined,
    LoginOutlined, BookOutlined, EyeInvisibleOutlined, EyeOutlined
} from '@ant-design/icons';
import Loader from 'react-loaders'
import { UsersTable, CbtUsersTable, Questions, ExamsTable, ContactMessagesTable, PasswordUpdateForm,
    ActivateUserForm, DepositUserForm, PasswordChangeForm, CbtPasswordChangeForm 
} from '../components'
import '../styles/Dashboard.scss'
import { GlobalContext } from '../app/GlobalState'
import { formatAmountManually } from '../services/userHelper'


const { Title } = Typography
const { TabPane } = Tabs

const Dashboard = () => {
    const [showTable, setShowTable] = useState(false)
    const { state, userLogout } = useContext(GlobalContext)

    const menuItems = [
        {
            label: (
                <div>
                    <Title level={5}>
                        <MoneyCollectOutlined /> <b>Account Balance: </b>
                    </Title>
                    <Title className="user-amount" level={2}>
                        ${ state.user.amountBalance !== null ? formatAmountManually(state.user.amountBalance) : formatAmountManually(0) }
                    </Title>
                </div>
            )
        },
        {
            type: 'divider',
        },
        {
            label: state.user.role === 'admin' && (
                <Button className="dropdown-menu-button" onClick={() => setShowTable(true) }>
                    <TableOutlined />
                    Tables
                </Button>
            )
        },
        {
            label: state.user.role === 'admin' && (
                <Button className="dropdown-menu-button" onClick={() => setShowTable(false) }>
                    <BookOutlined />
                    Questions
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
            label: state.loggedIn && (
                <Button className="dropdown-menu-button" onClick={() => userLogout }>
                    <LogoutOutlined />
                    Log Out
                </Button>
            )
        },
        {
            label: !state.loggedIn && (
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
                <Title level={2} className="text">User Dashboard ({ state.user.role === 'admin' ? 'Admin' : 'Guest' })</Title>
                <div className="dropdown">
                    <Title level={1} className="text-avatar">
                        <span className='text-span'>
                            { state.user.token !== null ? (state.user.firstname[0].toUpperCase()).concat(state.user.lastname[0].toUpperCase()) : 'GU' }
                        </span>
                    </Title>
                    <Dropdown overlay={<Menu items={ menuItems } />}>
                        <a href='/' onClick={e => e.preventDefault()}>
                            <Title level={4} className="dropdown-text">
                                { state.user.username !== null ? state.user.username : 'guest' }  <DownOutlined />
                            </Title>
                        </a>
                    </Dropdown>
                </div>
            </div>
            { (state.loggedIn || state.cbtLoggedIn) && (
                <div className="admin-tools">
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <ActivateUserForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <DepositUserForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <PasswordChangeForm />
                        </div>
                    )}
                    { (state.cbtUser.role === "admin" || state.user.role === "admin") && (
                        <div className="admin-tool">
                            <CbtPasswordChangeForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <PasswordUpdateForm />
                        </div>
                    )}
                </div>
            )}
            { (state.loggedIn || state.cbtLoggedIn) && (
                <div className="toggle-container">
                    <Button className='toggle-button' onClick={ () => setShowTable(!showTable) }>
                        {showTable ? <EyeInvisibleOutlined  /> : <EyeOutlined  />} {showTable ? "Hide" : "Show"} Tables
                    </Button>
                </div>
            )}
            { (showTable && state.loggedIn && state.user.role === "admin") && (
                <div className="tables">
                    <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Users</Title> </span> } key="1">
                            <UsersTable />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Students</Title> </span> } key="2">
                            <CbtUsersTable />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Exam Data</Title> </span> } key="3">
                            <ExamsTable />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Contact Messages</Title> </span> } key="4">
                            <ContactMessagesTable />
                        </TabPane>
                    </Tabs>
                </div>
            )}
            { (!showTable && state.cbtLoggedIn && state.cbtUser.role !== "student") && (
                <div className="questions">
                    <div className="list">
                        <Questions />
                    </div>
                </div>
            )}
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Dashboard


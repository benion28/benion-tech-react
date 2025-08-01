import React, { useState, useContext } from 'react'
import { Typography, Menu, Dropdown, Button, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { DownOutlined, SmileOutlined, LogoutOutlined, TableOutlined, MoneyCollectOutlined,
    LoginOutlined, BookOutlined, EyeInvisibleOutlined, EyeOutlined
} from '@ant-design/icons';
import Loader from 'react-loaders'
import { UsersTable, CbtUsersTable, Questions, ExamsTable, ContactMessagesTable, PasswordUpdateForm,
    ActivateUserForm, DepositUserForm, PasswordChangeForm, CbtPasswordChangeForm, ScoresTable, 
    GenerateCodeForm, ImageGallaryForm, AddPostForm, CbtPromoteForm, UserExamsTable, UtmeQuestions, PaymentsTable,
    CountryStatesTable, StateLgasTable
} from '../components'
import '../styles/Dashboard.scss'
import { GlobalContext } from '../app/GlobalState'
import { formatAmountManually } from '../services/userHelper'


const { Title } = Typography
const { TabPane } = Tabs

const Dashboard = () => {
    const [showTable, setShowTable] = useState(false)
    const [showPersonalTable, setShowPersonalTable] = useState(false)
    const [showUtme, setShowUtme] = useState(false)
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
                    { (state.tempCbtRole === "admin" || state.user.role === "admin") && (
                        <div className="admin-tool">
                            <CbtPasswordChangeForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <PasswordUpdateForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <GenerateCodeForm />
                        </div>
                    )}
                    { (state.tempCbtRole === "admin" || state.user.role === "admin") && (
                        <div className="admin-tool">
                            <CbtPromoteForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <ImageGallaryForm />
                        </div>
                    )}
                    { state.user.role === "admin" && (
                        <div className="admin-tool">
                            <AddPostForm />
                        </div>
                    )}
                </div>
            )}
            { (state.loggedIn && state.user.role === "admin") && (
                <div className="toggle-container">
                    <Button className='toggle-button' onClick={ () => {setShowTable(!showTable); setShowPersonalTable(false)} }>
                        {(showTable && !showPersonalTable) ? <EyeInvisibleOutlined  /> : <EyeOutlined  />} {showTable ? "Hide" : "Show"} Tables
                    </Button>
                </div>
            )}
            { (state.loggedIn && state.user.role === "admin") && (
                <div className="toggle-container">
                    <Button className='toggle-button' onClick={ () => {setShowTable(false); setShowPersonalTable(!showPersonalTable)} }>
                        {(!showTable && showPersonalTable) ? <EyeInvisibleOutlined  /> : <EyeOutlined  />} {showTable ? "Hide" : "Show"} Personal Tables
                    </Button>
                </div>
            )}
            { (state.loggedIn && state.user.role === "admin" && !showTable) && (
                <div className="toggle-container">
                    <Button className='toggle-button' onClick={ () => setShowUtme(!showUtme) }>
                        {showUtme ? <EyeInvisibleOutlined  /> : <EyeOutlined  />} {showUtme ? "Hide UTME" : "Show UTME"} Questions
                    </Button>
                </div>
            )}
            { (!showPersonalTable && showTable && state.loggedIn && state.user.role === "admin") && (
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
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Student's Scores</Title> </span> } key="5">
                            <ScoresTable />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Payments</Title> </span> } key="6">
                            <PaymentsTable />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Utme Exams</Title> </span> } key="7">
                            <UserExamsTable self = { false } />
                        </TabPane>
                    </Tabs>
                </div>
            )}
            { (showPersonalTable && !showTable && state.loggedIn && state.user.role === "admin") && (
                <div className="tables">
                    <Tabs defaultActiveKey="8" className="tabs-form" type="card">
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Country States</Title> </span> } key="8">
                            <CountryStatesTable self = { false } />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>State Lgas</Title> </span> } key="9">
                            <StateLgasTable self = { false } />
                        </TabPane>
                    </Tabs>
                </div>
            )}
            { !showPersonalTable && showTable && state.cbtLoggedIn && (
                <div className="cbt-tables">
                    <Tabs defaultActiveKey="10" className="tabs-form" type="card">
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Exam Data</Title> </span> } key="10">
                            <UserExamsTable self = { true } />
                        </TabPane>
                    </Tabs>
                </div>
            )}
            { (!showTable && !showUtme && state.cbtLoggedIn && state.tempCbtRole !== "student") && (
                <div className="questions">
                    <div className="list">
                        <Questions />
                    </div>
                </div>
            )}
            { (!showTable && showUtme && state.cbtLoggedIn && state.tempCbtRole !== "student") && (
                <div className="questions">
                    <div className="list">
                        <UtmeQuestions />
                    </div>
                </div>
            )}
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Dashboard


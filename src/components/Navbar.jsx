import React, { useState, useEffect, useContext } from 'react'
import { Menu, Button, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
    MenuOutlined,
    HomeOutlined,
    MoneyCollectOutlined,
    FundOutlined,
    DesktopOutlined,
    ReadOutlined,
    DollarCircleOutlined,
    DatabaseOutlined,
    GlobalOutlined,
    HomeFilled,
    PoweroffOutlined,
    TeamOutlined,
    MoneyCollectTwoTone
} from '@ant-design/icons'
import benionPassport from '../images/benion-passport.jpg'
import { GlobalContext } from '../app/GlobalState'
import '../styles/Navbar.scss'

const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screensize, setScreensize] = useState(null);
    const { state, showAlert } = useContext(GlobalContext)

    useEffect(() => {
        const handleResize = () => setScreensize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screensize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screensize]);

    return (
        <div className="nav-container">
            {!state.startExam && (
                <div className="logo-container">
                    <Avatar src={benionPassport} size="large" />
                    <Title level={2} className="logo">
                        <Link to="/">Benion-Tech</Link>
                    </Title>
                    <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                        <MenuOutlined />
                    </Button>
                </div>
            )}
            {(activeMenu && !state.startExam) && (
                <Menu theme="dark">
                    {!state.loggedIn && (
                        <Item icon={<HomeOutlined />}>
                            <Link to="/"><b>Home</b></Link>
                        </Item>
                    )}
                    {state.loggedIn && (
                        <Item icon={<HomeFilled />}>
                            <Link to="/dashboard"><b>Dashboard</b></Link>
                        </Item>
                    )}
                    <Item icon={<FundOutlined />}>
                        <Link to="/gallery"><b>Gallery</b></Link>
                    </Item>
                    {state.loggedIn && (
                        <Item icon={<DollarCircleOutlined />}>
                            <Link to="/cryptos"><b>Cryptos</b></Link>
                        </Item>
                    )}
                    {(!state.loggedIn || (state.user.role !== 'admin' && state.loggedIn)) && (
                        <Item icon={<GlobalOutlined />}>
                            <Link to="/posts"><b>Posts</b></Link>
                        </Item>
                    )}
                    {(state.loggedIn) && (
                        <Item icon={<MoneyCollectTwoTone />}>
                            <a target='_blank' rel='noreferrer'  href="https://benion-tech-server.onrender.com/benion-payments"><b>Make Online Deposit</b></a>
                        </Item>
                    )}
                    <Item icon={<DesktopOutlined />}>
                        <Link to="/benion-cbt"><b>CBT</b></Link>
                    </Item>
                    {(state.cbtLoggedIn) && (
                        <Item icon={<DesktopOutlined />}>
                            <Link to="/benion-utme"><b>UTME</b></Link>
                        </Item>
                    )}
                    <Item icon={<TeamOutlined />}>
                        <Link to="/benion-sms"><b>SMS</b></Link>
                    </Item>
                    {(state.user.role === 'admin' && state.loggedIn) && (
                        <Item icon={<PoweroffOutlined />}>
                            <Button type='ghost' onClick={() => showAlert(!state.showAlert)} className='alert-item'><b>Swich Alert ({state.showAlert ? "OFF" : "ON"}) </b> <PoweroffOutlined className={state.showAlert ? 'alert-on' : 'alert-off'} /></Button>
                        </Item>
                    )}
                    <Item icon={<MoneyCollectOutlined />}>
                        <Link to="/benion-donate"><b>Donate</b></Link>
                    </Item>
                    {(state.cbtLoggedIn && state.tempCbtRole !== "student") && (
                        <Item icon={<ReadOutlined />}>
                            <Link to="/benion-cbt-users/all-questions"><b>All Questions</b></Link>
                        </Item>
                    )}
                    {(state.cbtLoggedIn && state.tempCbtRole !== "student") && (
                        <Item icon={<ReadOutlined />}>
                            <Link to="/benion-cbt-users/utme-questions"><b>UTME Questions</b></Link>
                        </Item>
                    )}
                    {(state.user.role === 'admin' && state.loggedIn) && (
                        <Item icon={<DatabaseOutlined />}>
                            <Link to="/benion-users/all-posts"><b>All Posts</b></Link>
                        </Item>
                    )}
                </Menu>
            )}
        </div>
    )
}

export default Navbar
import React, { useState, useEffect, useContext } from 'react'
import { Menu, Button, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
    MenuOutlined,
    HomeOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    FundOutlined,
    DesktopOutlined,
    ReadOutlined,
    DollarCircleOutlined,
    DollarOutlined,
    DatabaseOutlined,
    PlusCircleOutlined,
    GlobalOutlined,
    HomeFilled,
    PoweroffOutlined
} from '@ant-design/icons'
import benionPassport from '../images/benion-passport.jpg'
import { GlobalContext } from '../app/GlobalState'
import '../styles/Navbar.scss'

const { Title  } = Typography;
const { Item  } = Menu;

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
            <div className="logo-container">
                <Avatar src={benionPassport} size="large" />
                <Title level={2} className="logo">
                    <Link to="/">Benion-Tech</Link>
                </Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
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
                        <Link to="/works"><b>Works</b></Link>
                    </Item>
                    <Item icon={<DollarCircleOutlined />}>
                        <Link to="/cryptos"><b>Cryptos</b></Link>
                    </Item>
                    <Item icon={<GlobalOutlined />}>
                        <Link to="/benion-news"><b>News</b></Link>
                    </Item>
                    <Item icon={<DesktopOutlined />}>
                        <Link to="/benion-cbt"><b>CBT</b></Link>
                    </Item>
                    { (state.user.role === 'admin' && state.loggedIn) && (
                        <Item icon={<PoweroffOutlined />}>
                            <Button type='ghost' onClick={ () => showAlert(!state.showAlert) } className='alert-item'><b>Swich Alert ({ state.showAlert ? "OFF" : "ON" }) </b> <PoweroffOutlined className={ state.showAlert ? 'alert-on' : 'alert-off' } /></Button>
                        </Item>
                    )}
                    <Item icon={<MoneyCollectOutlined />}>
                        <Link to="/benion-donate"><b>Donate</b></Link>
                    </Item>
                    <Item icon={<ReadOutlined />}>
                        <Link to="/benion-users/all-users"><b>All Questions</b></Link>
                    </Item>
                    <Item icon={<DatabaseOutlined />}>
                        <Link to="/benion-users/all-news"><b>All News</b></Link>
                    </Item>
                    <Item icon={<BulbOutlined />}>
                        <Link to="/benion-news/activate-user"><b>Activate User</b></Link>
                    </Item>
                    <Item icon={<PlusCircleOutlined />}>
                        <Link to="/benion-news/add-news"><b>Add News</b></Link>
                    </Item>
                    <Item icon={<DollarOutlined />}>
                        <Link to="/benion-users/deposit-for-user"><b>Deposit For User</b></Link>
                    </Item>
                </Menu>
            )}
        </div>
    )
}

export default Navbar
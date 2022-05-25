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
    UsergroupAddOutlined,
    DollarOutlined,
    DatabaseOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    GlobalOutlined,
    HomeFilled
} from '@ant-design/icons'
import benionPassport from '../images/benion-passport.jpg'
import { GlobalContext } from '../app/GlobalState'

const { Title  } = Typography;
const { Item  } = Menu;

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screensize, setScreensize] = useState(null);
    const { loggedIn } = useContext(GlobalContext)

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
                    {!loggedIn && (
                        <Item icon={<HomeOutlined />}>
                            <Link to="/"><b>Home</b></Link>
                        </Item>
                    )}
                    {loggedIn && (
                        <Item icon={<HomeFilled />}>
                            <Link to="/dashboard"><b>Dashboard</b></Link>
                        </Item>
                    )}
                    <Item icon={<FundOutlined />}>
                        <Link to="/works"><b>Works</b></Link>
                    </Item>
                    <Item icon={<GlobalOutlined />}>
                        <Link to="/benion-news"><b>News</b></Link>
                    </Item>
                    <Item icon={<DesktopOutlined />}>
                        <Link to="/benion-cbt"><b>CBT</b></Link>
                    </Item>
                    <Item icon={<MoneyCollectOutlined />}>
                        <Link to="/benion-donate"><b>Donate</b></Link>
                    </Item>
                    <Item icon={<ReadOutlined />}>
                        <Link to="/benion-users/all-users"><b>All Questions</b></Link>
                    </Item>
                    <Item icon={<DatabaseOutlined />}>
                        <Link to="/benion-users/all-news"><b>All News</b></Link>
                    </Item>
                    <Item icon={<UsergroupAddOutlined />}>
                        <Link to="/benion-cbt/add-student"><b>Add Student</b></Link>
                    </Item>
                    <Item icon={<BulbOutlined />}>
                        <Link to="/benion-news/activate-user"><b>Activate User</b></Link>
                    </Item>
                    <Item icon={<PlusCircleOutlined />}>
                        <Link to="/benion-news/add-news"><b>Add News</b></Link>
                    </Item>
                    <Item icon={<PlusOutlined />}>
                        <Link to="/benion-cbt/add-question"><b>Add Question</b></Link>
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
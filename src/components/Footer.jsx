import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space } from 'antd'
import { CopyrightCircleOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'

const { Title } = Typography;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Semptember", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Footer = () => {
    const [date, setDate] = useState(new Date());
    const { loggedIn } = useContext(GlobalContext)

    setInterval(() => {
        setDate(new Date());
    }, 1000);

    return (
        <div>
            <Title level={5} style={{ color: "white", textAlign: "center" }}>
                Benion-Tech <b />
                All rights reserved <CopyrightCircleOutlined />
            </Title>
            <Space>
                {!loggedIn && (
                    <Link to="/"><b>Home</b></Link>
                )}
                {loggedIn && (
                    <Link to="/dashboard"><b>Dashboard</b></Link>
                )}
                <Link to="/works"><b>Works</b></Link>
                <Link to="/contact"><b>Contact</b></Link>
                <Link to="/about"><b>About</b></Link>
            </Space>
            <div className="date-container">
                <Title level={4} type="success"><ClockCircleOutlined />    <b>{date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}</b></Title>
                <Title level={5} type="success"><CalendarOutlined />    {date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()} ({days[date.getDay()]})</Title>
            </div>
        </div>
    )
}

export default Footer


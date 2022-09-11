import React, { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Tabs, Typography, Row, Col, Card, Popconfirm, Popover, Button, Select } from 'antd'
import { AddPostForm, EditPostForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import { postCategories, postTags, truncatePost } from '../services/userHelper'
import '../styles/Questions.scss'
import { Link } from 'react-router-dom'

const { Fragment } = React
const { TabPane } = Tabs
const { Title, Text } = Typography
const { Option } = Select

const AllPosts = () => {
    const { state, deletePost, getPosts } = useContext(GlobalContext)
    const [newsPosts, setNewsPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [blogPosts, setBlogPosts] = useState([])
    const [othersPosts, setOthersPosts] = useState([])
    const [newPostPopover, setNewPostPopover] = useState(false)
    const [editPostPopover, setEditPostPopover] = useState(false)
    const [ details, setDetails ] = useState({ $key: 'gfsgdfgdew4rrewtr5e' })

    useEffect(() => {
        const data = state?.posts[3]
        const newsFilter = data.filter(item => item.category === 'news')
        const blogFilter = data.filter(item => item.category === 'blog')
        const othersFilter = data.filter(item => item.category === 'others')
        setPosts(data)
        setNewsPosts(newsFilter)
        setBlogPosts(blogFilter)
        setOthersPosts(othersFilter)
    }, [state?.posts])

    const deleteConfirm = (key) => {
        deletePost(key)
    }

    const deleteAllConfirm = () => {
        posts.forEach(post => {
            deletePost(post.$key)
        })
    }

    const onEdit = (object) => {
        setEditPostPopover(true)
        setDetails(object)
    }

    const handleCategory = (value) => {
        if (value === 'all') {
            setPosts(state?.posts[3])
        } else {
            const filteredData = state?.posts[3].filter((post) => post.category === value)
            setPosts(filteredData)
        }
    }

    const handleTag = (value) => {
        if (value === 'all') {
            setPosts(state?.posts[3])
        } else {
            const filteredData = state?.posts[3].filter((post) => post.tag === value)
            setPosts(filteredData)
        }
    }

    const handleCreator = (value) => {
        if (value === 'all') {
            setPosts(state?.posts[3])
        } else {
            const filteredData = state?.posts[3].filter((post) => post.creator === value)
            setPosts(filteredData)
        }
    }

    const getPostsDisplay = (items) => {
        return (
            <div>
                { (items.length < 1) && (
                    <Text strong level={1}>
                        Currently there are no Posts available at the moment...
                    </Text>
                )}

                {(items.length > 0) && (
                    <Row gutter={[20, 20]} className="crypto-card-container">
                        {items?.map((item) => (
                        <Col xs={24} sm={12} lg={8} className="crypto-card" key={ item.$key  }>
                                <Card title={`(${items.indexOf(item) + 1}). ${item.category.toUpperCase()} POST -- (${item.creator})`} hoverable>
                                    <p>
                                        <b>{item.title.toUpperCase()}</b> -- <i>({item.tag})</i>
                                    </p>
                                    <img className="post-image" src={item.image} alt="post-display" />
                                    <p>
                                        <i>{item.caption} -- <small><b>(at {item.date})</b></small></i>
                                    </p>
                                    <hr></hr>
                                    <p>
                                        {truncatePost(item.content, 100)} -- <i><Link to={`/posts/${item.$key}`}><b>Read More</b></Link></i>
                                    </p>

                                    {(state.loggedIn && state.user.role === "admin" ) && (
                                        <div className="action">
                                            <Popover
                                                placement='bottomLeft'
                                                content={ <EditPostForm post={item} />}
                                                title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Post</b> <Button onClick={ () => setEditPostPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                                                trigger='click'
                                                visible={ editPostPopover && (item.$key === details.$key) }
                                            >
                                                <Button className='edit-button' onClick={ () => onEdit(item) }>
                                                    <EditOutlined  />
                                                </Button>
                                            </Popover>
                                            <Popconfirm
                                                title="Are you sure to delete this post?"
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                                                onConfirm={ () => deleteConfirm(item.$key) }
                                            >
                                                <Button className='delete-button'>
                                                    <DeleteOutlined  />
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    )}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        )
    }

    return (
        <Fragment>
            { posts.length !== 0 && (
                <Title level={2} className="home-title">
                    All {posts.length} Posts Sorter
                </Title>
            )}

            <div className="exam-question-sorter">
                {(state.loggedIn && state.user.role === "admin") && (
                    <div className="option-item">
                        <Popover
                            placement='bottomRight'
                            content={ <AddPostForm />}
                            title= {() => (<Title level={2} className='add-user-title'><b>Add New Post</b> <Button onClick={ () => setNewPostPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                            trigger='click'
                            visible={ newPostPopover }
                        >
                            <Button className='add-button' onClick={ () => setNewPostPopover(true) }>
                                <PlusOutlined  />  Add Post
                            </Button>
                        </Popover>
                    </div>
                )}
                {(state.loggedIn) && (
                    <div className="option-item">
                        <Button className='get-button' onClick={ () => getPosts() }>
                            <ReloadOutlined  /> Reload
                        </Button>
                    </div>
                )}
                {(state?.posts[3].length > 0 && state.loggedIn && state.user.role === "admin") && (
                    <div className="option-item">
                        <Select placeholder="Based on Creator" optionFilterProp="children" onChange={(value) => handleCreator(value)} allowClear>
                            <Option value="all">All Posts</Option>
                            <Option value={state.user.username}>My Posts</Option>
                        </Select>
                    </div>
                )}
                {(state?.posts[3].length > 0 && state.loggedIn && state.user.role === "admin") && (
                    <div className="option-item">
                        <Select placeholder="Select a Category" optionFilterProp="children" onChange={(value) => handleCategory(value)}  allowClear>
                            <Option value="all">All Categories</Option>
                            {postCategories.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            <Option value="others">Others</Option>
                        </Select>
                    </div>
                )}
                {(state?.posts[3].length > 0 && state.loggedIn) && (
                    <div className="option-item">
                        <Select placeholder="Select a Tag" optionFilterProp="children" onChange={(value) => handleTag(value)}  allowClear>
                            <Option value="all">All Tags</Option>
                            {postTags.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            <Option value="others">Others</Option>
                        </Select>
                    </div>
                )}
                {(state?.posts[3].length > 0 && state.loggedIn && state.user.role === "admin") && (
                    <div className="option-item">
                        <Popconfirm
                            title="Are you sure to delete all posts?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                            onConfirm={ () => deleteAllConfirm() }
                        >
                            <Button className='delete-button'>
                                <DeleteOutlined  /> Delete All Posts
                            </Button>
                        </Popconfirm>
                    </div>
                )}
            </div>
            <div className="tables">
                <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                    { (state.loggedIn && state.user.role === "admin") && (
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>All</Title> </span> } key="1">
                            { getPostsDisplay(posts) }
                        </TabPane>
                    )}
                    <TabPane className="tabs-panel" tab={ <span> <Title level={4}>News</Title> </span> } key="2">
                        { getPostsDisplay(newsPosts) }
                    </TabPane>
                    { (state.loggedIn) && (
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Blog</Title> </span> } key="3">
                            { getPostsDisplay(blogPosts) }
                        </TabPane>
                    )}
                    { (state.loggedIn) && (
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Others</Title> </span> } key="4">
                            { getPostsDisplay(othersPosts) }
                        </TabPane>
                    )}
                </Tabs>
            </div>
        </Fragment>
    )
}

export default AllPosts


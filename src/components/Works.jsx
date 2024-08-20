import React, { useContext, useEffect, useState } from 'react'
import { Button, Carousel, Col, Popconfirm, Popover, Row, Select, Tabs, Typography } from 'antd'
import '../styles/Works.scss'
import { GlobalContext } from '../app/GlobalState'
import { ImageGallaryForm, EditImageForm } from '../components'
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, ReloadOutlined, ArrowRightOutlined } from '@ant-design/icons'

const { Fragment } = React
const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

const contentStyle = {
    height: '160px',
    width: '100px',
    color: 'fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
}

const Works = () => {
    const { state, getImages, deleteImage } = useContext(GlobalContext)
    const [ images, setImages ] = useState([])
    const [ workImages, setWorkImages ] = useState([])
    const [ otherImages, setOtherImages ] = useState([])
    const [newImagePopover, setNewImagePopover] = useState(false)
    const [editImagePopover, setEditImagePopover] = useState(false)
    const [ details, setDetails ] = useState({ $key: 'gfsgdfgdew4rrewtr5e' })

    useEffect(() => {
        const data = state?.galleryImages[3]
        const category = 'Works'
        if (data.length > 0) {
            const worksFilter = data.filter(image => (image.category.toLowerCase() === category.toLowerCase() || image.category.toLowerCase() === 'work'))
            const othersFilter = data.filter(image => (image.category.toLowerCase() !== category.toLowerCase() && image.category.toLowerCase() !== 'work'))
            setImages(data)
            setOtherImages(othersFilter)
            setWorkImages(worksFilter)
        }
    }, [state?.galleryImages])

    const deleteConfirm = (key) => {
        deleteImage(key)
    }

    const deleteAllConfirm = () => {
        images.forEach(image => {
            deleteImage(image.$key)
        })
    }

    const onEdit = (object) => {
        setEditImagePopover(true)
        setDetails(object)
    }

    const handleCategory = (value) => {
        const data = state?.galleryImages[3]
        if (value === 'all') {
            setImages(data)
        } else if (value === 'Works') {
            const worksFilter = data.filter(image => (image.category.toLowerCase() === value.toLowerCase() || image.category.toLowerCase() === 'work'))
            setImages(worksFilter)
        } else {
            const value = 'Works'
            const othersFilter = data.filter(image => (image.category.toLowerCase() !== value.toLowerCase() && image.category.toLowerCase() !== 'work'))
            setImages(othersFilter)
        }
    }

    const getImagesDisplay = (items) => {
        return (
            <div className='image-container'>
                <Col className="slider-container">
                    <Row className="coin-desc">
                        <Carousel className="slider" effect="fade" autoplay>
                            {items?.map(item => (
                                <div key={item.$key} style={contentStyle} className="item">
                                    <Title level={4} className="text">{item.caption.toUpperCase()}</Title>
                                    <img className="image" src={item.image} alt={item.caption} />
                                    {(state.loggedIn) && (
                                        <div className="action">
                                            {(state.user.role === "admin" ) && (
                                                <Popover
                                                    placement='bottomLeft'
                                                    content={ <EditImageForm image={item} />}
                                                    title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Image</b> <Button onClick={ () => setEditImagePopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                                                    trigger='click'
                                                    visible={ editImagePopover && (item.$key === details.$key) }
                                                    className="action-list"
                                                >
                                                    <Button className='edit-button' onClick={ () => onEdit(item) }>
                                                        Edit <EditOutlined  />
                                                    </Button>
                                                </Popover>
                                            )}
                                            {(state.user.role === "admin" ) && (
                                                <Popconfirm
                                                    title="Are you sure to delete this image?"
                                                    icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                                                    onConfirm={ () => deleteConfirm(item.$key) }
                                                    className="action-list"
                                                >
                                                    <Button className='delete-button'>
                                                        Delete <DeleteOutlined  />
                                                    </Button>
                                                </Popconfirm>
                                            )}
                                            { item?.category === 'Works' && (
                                                <a className="action-list" target="_blank" rel="noreferrer" href={item.link}>
                                                    <Button className='edit-button'>
                                                        Visit <ArrowRightOutlined  />
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Carousel>
                    </Row>
                    { (items.length > 0) && (
                        <Title level={3} className="coin-details-heading">
                            All { items.length } Image{ items.length > 0 ? 's' : '' }
                        </Title>
                    )}
                    <Col className="coin-links">
                        { items?.map((item) =>(
                            <Row className="coin-link" key={item.$key}>
                                <Title level={5} className="link-name">
                                    <img src={item.image} alt="post-display" />
                                    <a className="link" target="_blank" rel="noreferrer" href={item.link}>{ item.caption }</a>
                                    <div className="action">
                                        {(state.loggedIn && state.user.role === "admin" ) && (
                                            <Popover
                                                placement='bottomLeft'
                                                content={ <EditImageForm image={item} />}
                                                title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Image</b> <Button onClick={ () => setEditImagePopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                                                trigger='click'
                                                visible={ editImagePopover && (item.$key === details.$key) }
                                                className="action-list"
                                            >
                                                <Button className='edit-button' onClick={ () => onEdit(item) }>
                                                    <EditOutlined  />
                                                </Button>
                                            </Popover>
                                        )}
                                        {(state.loggedIn && state.user.role === "admin" ) && (
                                            <Popconfirm
                                                title="Are you sure to delete this image?"
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                                                onConfirm={ () => deleteConfirm(item.$key) }
                                                className="action-list"
                                            >
                                                <Button className='delete-button'>
                                                    <DeleteOutlined  />
                                                </Button>
                                            </Popconfirm>
                                        )}
                                        { item?.category === 'Works' && (
                                            <a className="action-list" target="_blank" rel="noreferrer" href={item.link}>
                                                <Button className='edit-button'>
                                                    Visit <ArrowRightOutlined  />
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </Title>
                            </Row>
                        )) }
                    </Col>
                </Col>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="gallery-container">
                <Title level={3}>Portfolio Images</Title>
                {(state.loggedIn && state.user.role === "admin") && (
                    <div className="exam-question-sorter">
                        <div className="option-item">
                            <Popover
                                placement='bottomRight'
                                content={ <ImageGallaryForm />}
                                title= {() => (<Title level={2} className='add-user-title'><b>Add New Image</b> <Button onClick={ () => setNewImagePopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                                trigger='click'
                                visible={ newImagePopover }
                            >
                                <Button className='add-button' onClick={ () => setNewImagePopover(true) }>
                                    <PlusOutlined  />  Add Image
                                </Button>
                            </Popover>
                        </div>
                        <div className="option-item">
                            <Button className='get-button' onClick={ () => getImages() }>
                                <ReloadOutlined  /> Reload
                            </Button>
                        </div>
                        <div className="option-item">
                            <Select placeholder="Select a Category" optionFilterProp="children" onChange={(value) => handleCategory(value)}  allowClear>
                                <Option value="all">All Categories</Option>
                                <Option value="Works">Works</Option>
                                <Option value="Others">Others</Option>
                            </Select>
                        </div>
                        <div className="option-item">
                            <Popconfirm
                                title="Are you sure to delete all images?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                                onConfirm={ () => deleteAllConfirm() }
                            >
                                <Button className='delete-button'>
                                    <DeleteOutlined  /> Delete All Images
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                )}
                { images.length === 0 && (
                    <div>
                        <Title level={3} className="coin-details-heading">
                            Images
                        </Title>
                        <Text>
                            No Image Available At The Moment..
                        </Text>
                    </div>
                )}
                { (images.length > 0 && workImages.length > 0) && (
                    <div className="tables">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            {(state.loggedIn && state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>All</Title> </span> } key="1">
                                    { getImagesDisplay(images) }
                                </TabPane>
                            )}
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Works</Title> </span> } key="2">
                                { getImagesDisplay(workImages) }
                            </TabPane>
                            {(state.loggedIn && state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Others</Title> </span> } key="3">
                                    { getImagesDisplay(otherImages) }
                                </TabPane>
                            )}
                        </Tabs>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Works


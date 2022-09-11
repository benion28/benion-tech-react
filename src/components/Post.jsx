import React, { useContext, useEffect, useState } from 'react'
import { Col, Typography, Row } from 'antd'
import Loader from 'react-loaders'
import { Link, useParams } from "react-router-dom"
import HTMLReactParser from 'html-react-parser'
import { GlobalContext } from '../app/GlobalState'
import benionTech from '../images/benion-tech-light.jpg'
import { limitPosts } from '../services/userHelper'

const { Fragment } = React
const { Title, Text } = Typography
const demoPost = {
    title: 'Post Title',
    content: `<b>Post Header</b><br><i>Post Content</i><img src=${benionTech} alt="post-display" /><p><small>photo caption</small></p>`,
    $key: 'gfjhfjks',
    caption: 'Post Caption',
    image: 'Post Image'
}

const Post = () => {
    const { state } = useContext(GlobalContext)
    const { key } = useParams()
    const [ post, setPost ] = useState(demoPost)
    const [ posts, setPosts ] = useState([])
    const [ linkPosts, setLinkPosts ] = useState([])

    useEffect(() => {
        const data = state?.posts[3]
        if (data.length > 0) {
            const postFilter = data.filter(item => item.$key === key)
            setPosts(data)
            setPost(postFilter[0])
            setLinkPosts(limitPosts(posts, 10))
        }
    }, [state?.posts, key, posts])

    return (
        <Fragment>
          { state.crypto.name !== null && (
            <Col className="coin-detail-container">
                <Title level={3} className="coin-details-heading">
                    { post.title }
                </Title>
                <Col className="coin-desc-link">
                    <Row className="post-desc">
                        <img src={post.image} alt="post-display" />
                        <Text level={4}>
                            <i>{post.caption} -- <small><b>(at {post.date})</b></small></i>
                            <br></br>
                            <br></br>
                            <Text level={2}>
                                { HTMLReactParser(post.content) }
                            </Text>
                        </Text>
                    </Row>
                    <Col className="post-links">
                        { linkPosts.length > 0 && (
                            <Title level={3} className="coin-details-heading">
                                Top { linkPosts.length } Post{linkPosts.length > 0 ? 's' : ''}
                            </Title>
                        )}
                        { linkPosts.length === 0 && (
                            <div>
                                <Title level={3} className="coin-details-heading">
                                    Post Links
                                </Title>
                                <Text>
                                    No Post Links Available At The Moment..
                                </Text>
                            </div>
                        )}
                        { linkPosts.map((item) =>(
                            <Row className="coin-link" key={item.$key}>
                                <Title level={5} className="link-name">
                                    <img src={item.image} alt="post-display" />
                                    <Link to={`/posts/${item.$key}`}>{ item.title }</Link>
                                </Title>
                            </Row>
                        )) }
                    </Col>
                </Col>
            </Col>
          )}
          <Loader type="pacman" />
      </Fragment>
    )
}

export default Post


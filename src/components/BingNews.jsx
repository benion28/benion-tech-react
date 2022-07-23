import React, { useContext, useEffect, useState } from 'react';
import { Typography, Row, Col, Avatar, Card, Button } from "antd";
import moment from "moment";
import { GlobalContext } from '../app/GlobalState';
import { ReloadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography

const demoImageUrl = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

const BingNews = () => {
    const { state, getBingNews } = useContext(GlobalContext)
    // const [ bingNews, setBingNews ] = useState([])

    const bingNews = state.news.bingNews.value

    useEffect(() => {
        // getBingNews({ count: 200 })
        // setBingNews(state.news.bingNews.value)
    }, [state.news.bingNews.value, getBingNews])

    return (
    <div>
        <div className="button-container">
            { state.loggedIn && (
                <Button className='get-button' onClick={ () => getBingNews({ count: 200 }) }>
                    <ReloadOutlined  /> Get Bing News
                </Button>
            )}
        </div>

        {state.news.bingNews.value.length === 0 && (
            <Text strong level={1}>
                Currently there are no Bing News available at the moment...
            </Text>
        )}
        <Row gutter={[ 24, 24 ]}>
            {bingNews.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.name}
                                </Title>
                                <img style={{ maxWidth: "200px", maxHeight: "100px" }} src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news" />
                            </div>
                            <p>
                                { news.description > 100 ? `${news.description.substring(0, 100)}......` : news.description }
                            </p>
                            <div className="provider-container">
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news avatar" />
                                <Text className="provider-name">
                                    {news.provider[0]?.name}
                                </Text>
                            </div>
                            <Text>
                                {moment(news.datePublished).startOf("ss").fromNow()}
                            </Text>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    </div>
    )
}

export default BingNews
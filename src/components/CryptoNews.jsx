import React, { useContext, useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card, Input, Button } from "antd"
import moment from "moment"
import { GlobalContext } from '../app/GlobalState'
import { ReloadOutlined } from '@ant-design/icons'

const { Text, Title } = Typography
const { Option } = Select

const demoImageUrl = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

const CryptoNews = () => {
    const { state, getCryptoNews } = useContext(GlobalContext)
    const [ newsCategory, setNewsCategory ] = useState("crypto")
    // const [ cryptoNews, setCryptoNews ] = useState(state.news.cryptoNews.value)

    const cryptoNews = state.news.cryptoNews.value

    useEffect(() => {
        // getCryptoNews({ count: 200, newsCategory })
        // setCryptoNews(state.news.cryptoNews.value)
    }, [state.news.cryptoNews.value, newsCategory, getCryptoNews])

    return (
    <div>
        { state.loggedIn && (
            <div className="button-container">
                <Button className='get-button' onClick={ () => getCryptoNews({ count: 200, newsCategory }) }>
                    <ReloadOutlined  /> Get Cryoto News
                    
                </Button>
            </div>
        )}
        
        {state.news.cryptoNews.value.length === 0 && (
            <Text strong level={1}>
                Currently there are no Crypto News available at the moment...
            </Text>
        )}

        <Row gutter={[ 24, 24 ]}>
            {cryptoNews.length !== 0 && (
                <Col span={24}>
                    <Input className="search-input" placeholder="Search News" onChange={(event) => setNewsCategory(event.target.value) } />
                    <Select
                        showSearch
                        defaultValue={"Crypto"}
                        className="select-news"
                        placeholder="Select a Crypto News"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Crypto">
                                Crypto
                            </Option>
                            <Option value="Cryptocurrency">
                                Cryptocurrency
                            </Option>
                            {state?.cryptos?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                        </Select>
                </Col>
            )}
            {cryptoNews.map((news, i) => (
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

export default CryptoNews
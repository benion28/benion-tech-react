import React, { useContext, useState, useEffect } from 'react'
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Select, Typography } from "antd";
import { GlobalContext } from '../app/GlobalState'

const { Fragment } = React
const { Title, Text } = Typography
const { Option } = Select

const Cryptocurrencies = () => {
    const { state } = useContext(GlobalContext)
    const [cryptos, setCryptos] = useState([])
    const [count, setCount] = useState(100)
    const [searchTerm, setSearchTerm ] = useState("");

    useEffect(() => {
        const filteredData = state?.cryptos?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        let countedData = []
        for (let index = 0; index < count; index++) {
            countedData.push(filteredData[index])
        }
        setCryptos(countedData)
    }, [state.cryptos.coins, searchTerm, count, cryptos])

    return (
        <Fragment>
            { state.cryptos.coins.length !== 0 && (
                <Title level={2} className="home-title">
                    Top { count } Cryptocurrencies in the world
                </Title>
            )}

            { state.cryptos.coins.length === 0 && (
                <Text strong level={1}>
                    Currently there are no Cryptocurrencies available at the moment...
                </Text>
            )}

            {state.cryptos.coins.length !== 0 && (
                <div className="search-range-crypto">
                    <Input className="search-input" placeholder="Search Cryptocurrency" onChange={(event) => setSearchTerm(event.target.value) } />
                    <Select
                        showSearch
                        defaultValue={ count }
                        placeholder="Select Crypto Display Range"
                        optionFilterProp="children"
                        onChange={(value) => setCount(value)}
                        >
                            <Option value={10}>
                                10
                            </Option>
                            <Option value={25}>
                                25
                            </Option>
                            <Option value={50}>
                                50
                            </Option>
                            <Option value={75}>
                                75
                            </Option>
                            <Option value={100}>
                                100
                            </Option>
                        </Select>
                </div>
            )}

            {state.cryptos.coins.length !== 0 && (
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {cryptos?.map((currency) => (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={ currency.uuid  }>
                            <Link to={`/crypto/${currency.uuid}`}>
                                <Card 
                                    title={`${currency.rank }. ${currency.name}`}
                                    extra={<img className="crypto-image" src={currency.iconUrl} alt="currency" />}
                                    hoverable
                                >
                                    <p>
                                        <b>Name:</b> {currency.name} ({currency.symbol})
                                    </p>
                                    <p>
                                        <b>Price:</b> ${millify(currency.price)}
                                    </p>
                                    <p>
                                        <b>Market Cap:</b> {millify(currency.marketCap)}
                                    </p>
                                    <p>
                                        <b>Daily Change:</b> {millify(currency.change)}%
                                    </p>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    )
}

export default Cryptocurrencies
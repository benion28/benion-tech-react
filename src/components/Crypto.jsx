import React, {useState, useEffect, useContext} from 'react'
import HTMLReactParser from "html-react-parser"
import { useParams } from "react-router-dom"
import Loader from 'react-loaders'
import millify from "millify"
import { Row, Col, Typography, Select } from "antd"
import {
    MoneyCollectOutlined, 
    DollarCircleOutlined, 
    FundOutlined, 
    ExclamationCircleOutlined, 
    StopOutlined, 
    TrophyOutlined, 
    CheckOutlined, 
    NumberOutlined, 
    ThunderboltOutlined
} from '@ant-design/icons'

import { GlobalContext } from '../app/GlobalState'
import { LineChart } from '../components'

const { Fragment } = React
const { Text, Title } = Typography
const { Option } = Select

const Crypto = () => {
    const { state, getCrypto, getCryptoHistory } = useContext(GlobalContext)
    const { id } = useParams()
    const [ timePeriod, setTimePeriod ] = useState("7d")
    const [coinHistory, setCoinHistory] = useState([])
    const [cryptoDetails, setCryptoDetails] = useState(state.crypto)
    
    useEffect(() => {
        getCryptoHistory({ id, timePeriod })
        getCrypto(id)
        setCoinHistory(state.cryptoHistory)
        setCryptoDetails(state.crypto)
    }, [state.crypto, state.cryptoHistory, timePeriod, id, getCryptoHistory, getCrypto])

    console.log("coin History", coinHistory)

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price ? millify(cryptoDetails.price) : 0 }`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank ? cryptoDetails.rank : 0, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] ? millify(cryptoDetails["24hVolume"]) : 0 }`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap ? millify(cryptoDetails.marketCap) : 0 }`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${ cryptoDetails.allTimeHigh.price ? millify(cryptoDetails.allTimeHigh.price) : 0 }`, icon: <TrophyOutlined /> },
    ]

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets ? cryptoDetails.numberOfMarkets : 0, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges ? cryptoDetails.numberOfExchanges : 0, icon: <MoneyCollectOutlined /> },
        { title: 'Confirmed Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${ cryptoDetails.supply.total ? millify(cryptoDetails.supply.total) : 0 }`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${ cryptoDetails.supply.circulating ? millify(cryptoDetails.supply.circulating) : 0 }`, icon: <ExclamationCircleOutlined /> },
    ]

  return (
      <Fragment>
          { state.crypto.name !== null && (
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2} className="coin-name">
                        {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                    </Title>
                    <p>
                        {cryptoDetails.name} live price in US dollars.
                        View value statistics, market cap and supply.
                    </p>
                </Col>
                <Select 
                    defaultValue="7d" 
                    className="select-timeperiod"
                    placeholder="Select Time Period"
                    onChange={(value) => setTimePeriod(value)}
                >
                    {time.map((date) => <Option key={date}>{date}</Option>)}
                </Select>
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-detail-heading">
                                {cryptoDetails.name} Value Statistics
                            </Title>
                            <p>
                                An overview showing the stats of {cryptoDetails.name}
                            </p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{ icon }</Text>
                                    <Text>{ title }</Text>
                                </Col>
                                <Text className="stats">
                                    { value }
                                </Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-detail-heading">
                                Other Crypto Value Statistics
                            </Title>
                            <p>
                                An overview showing the stats of all Crypto Currencies
                            </p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{ icon }</Text>
                                    <Text>{ title }</Text>
                                </Col>
                                <Text className="stats">
                                    { value }
                                </Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-desc-link">
                    <Row className="coin-desc">
                        <Title level={3} className="coin-details-heading">
                            What is { cryptoDetails.name }
                            { HTMLReactParser(cryptoDetails.description) }
                        </Title>
                    </Row>
                    <Col className="coin-links">
                        <Title level={3} className="coin-details-heading">
                            { cryptoDetails.name } Links
                        </Title>
                        { cryptoDetails.links.map((link) =>(
                            <Row className="coin-link" key={link.name}>
                                <Title level={5} className="link-name">
                                    { link.type }
                                </Title>
                                <a href={link.url} target="_blank" rel="noreferrer">
                                    { link.name }
                                </a>
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

export default Crypto

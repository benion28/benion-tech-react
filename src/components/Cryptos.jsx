import React, { useContext, useEffect } from 'react'
import { Typography, Row, Col, Statistic, Tabs } from "antd"
import millify from "millify"
import Loader from 'react-loaders'
import { Cryptocurrencies, CryptoNews, BingNews } from '../components'
import { GlobalContext } from '../app/GlobalState'

const { Fragment } = React
const { Title } = Typography
const { TabPane } = Tabs

const Crypto = () => {
    const { state, getCryptos, getCryptoNews } = useContext(GlobalContext)
    const { totalCoins, totalExchanges, totalMarketCap, total24hVolume, totalMarkets } = state?.cryptos?.stats

    useEffect(() => {
        getCryptos({ count: 10 })
        getCryptoNews({ count: 200, newsCategory: "crypto" })
    })

    return (
      <Fragment>
          <div className="crypto-stats">
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <Row className="global-stats">
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={ totalCoins ? totalCoins : 0 } />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchange" value={ millify(totalExchanges ? totalExchanges : 0) } />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={ millify(totalMarketCap ? totalMarketCap : 0 ) } />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume" value={ millify(total24hVolume ? total24hVolume : 0) } />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={ millify(totalMarkets ? totalMarkets : 0) } />
                </Col>
            </Row>
          </div>
          <div className="crypto-tabs-container">
              <Tabs defaultActiveKey="1" className="crypto-tabs" type="card">
                    <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Cryptocurrencies</Title> </span> } key="1">
                        <Cryptocurrencies />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Crypto Exchanges</Title> </span> } key="2">
                        There are no Crypto Exchanges available at the moment...
                    </TabPane>
                    <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Crypto News</Title> </span> } key="3">
                        <CryptoNews />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Bing News</Title> </span> } key="4">
                        <BingNews />
                    </TabPane>
                </Tabs>
          </div>
          <Loader type="pacman" />
      </Fragment>
    )
}

export default Crypto

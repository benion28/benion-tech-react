import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Typography } from "antd"
import { GlobalContext } from '../app/GlobalState'
import { getClassName, getTermName, getSubjectName } from '../services/userHelper';
import '../styles/Scores.scss'

const { Fragment } = React
const { Title, Text } = Typography

const Scores = () => {
    const { state } = useContext(GlobalContext)
    const [results, setResults] = useState([])

    useEffect(() => {
        if (state?.scores[3].length > 0) {
            const filteredData = state?.scores[3].filter(item => item.username === state.cbtUser.username)
            if (filteredData.length > 0) {
                setResults(filteredData)
            }
        }
    }, [state.scores, state.cbtUser.username])

    return (
        <Fragment>
            {results.length > 0  && (
                <Title level={2} className="home-title">
                    {results.length > 1 ? 'All' : ''} Your {results.length} Result{results.length > 1 ? 's' : ''}
                </Title>
            )}

            {results.length < 1  && (
                <Text strong level={1}>
                    Currently there are no Results available at the moment...
                </Text>
            )}

            {results.length > 0  && (
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {results?.map((item) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={ item.$key  }>
                            <Card title={`${ getClassName(item.className) } (${ getTermName(item.term)})`} hoverable>
                                <p>
                                    <b>Subject:</b> { getSubjectName(item.subject).toUpperCase() }
                                </p>
                                <hr></hr>
                                <p>
                                    <b>1st CA Test:</b> {item.firstCA}
                                </p>
                                <p>
                                    <b>2nd CA Test:</b> {item.secondCA}
                                </p>
                                <p>
                                    <b>Exam:</b> {item.exam}
                                </p>
                                <hr></hr>
                                <p>
                                    <b>Total:</b> {item.total}
                                </p>
                                <p>
                                    <b>Grade:</b> {item.grade}
                                </p>
                                <p>
                                    <b>Comment:</b> {item.comment}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    )
}

export default Scores
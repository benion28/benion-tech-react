import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Select, Typography, Button, Popover, Popconfirm } from "antd"
import { AddQuestionForm, EditQuestionForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import { cbtCategories, cbtClasses, subjects, terms, getClassName } from '../services/userHelper';
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Fragment } = React
const { Title, Text } = Typography
const { Option } = Select

const Questions = () => {
    const { state, deleteQuestion } = useContext(GlobalContext)
    const [newQuestionPopover, setNewQuestionPopover] = useState(false)
    const [editQuestionPopover, setEditQuestionPopover] = useState(false)
    const [questions, setQestions] = useState([])
    const [ details, setDetails ] = useState({ $key: 'gfsgdfgdew4rrewtr5e' })

    const deleteConfirm = (key) => {
        deleteQuestion(key)
    }

    const deleteAllConfirm = () => {
        questions.forEach(question => {
            deleteQuestion(question.$key)
        })
    }

    const onEdit = (object) => {
        setEditQuestionPopover(true)
        setDetails(object)
    }

    useEffect(() => {
        const filteredData = state?.cbtQuestions[3] 
        setQestions(filteredData)
    }, [state.cbtQuestions])

    const handleCategory = (value) => {
        if (value === 'all') {
            setQestions(state?.cbtQuestions[3])
        } else {
            const filteredData = state?.cbtQuestions[3].filter((question) => question.category === value)
            setQestions(filteredData)
        }
    }

    const handleClass = (value) => {
        if (value === 'all') {
            setQestions(state?.cbtQuestions[3])
        } else {
            const filteredData = state?.cbtQuestions[3].filter((question) => question.className === value)
            setQestions(filteredData)
        }
    }

    const handleSubject = (value) => {
        if (value === 'all') {
            setQestions(state?.cbtQuestions[3])
        } else {
            const filteredData = state?.cbtQuestions[3].filter((question) => question.subject === value)
            setQestions(filteredData)
        }
    }

    const handleTerm = (value) => {
        if (value === 'all') {
            setQestions(state?.cbtQuestions[3])
        } else {
            const filteredData = state?.cbtQuestions[3].filter((question) => question.term === value)
            setQestions(filteredData)
        }
    }

    return (
        <Fragment>
            { questions.length !== 0 && (
                <Title level={2} className="home-title">
                    All {questions.length} Exam Questions Sorter
                </Title>
            )}

            
            <div className="exam-question-sorter">
                {(state.cbtLoggedIn && state.cbtUser.role !== "student") && (
                    <div className="option-item">
                        <Popover
                            placement='bottomRight'
                            content={ <AddQuestionForm />}
                            title= {() => (<Title level={2} className='add-user-title'><b>Add New Question</b> <Button onClick={ () => setNewQuestionPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                            trigger='click'
                            visible={ newQuestionPopover }
                        >
                            <Button className='add-button' onClick={ () => setNewQuestionPopover(true) }>
                                <PlusOutlined  />  Add Question
                            </Button>
                        </Popover>
                    </div>
                )}
                
                {(state?.cbtQuestions[3].length > 0 && state.cbtUser.role !== "student") && (
                    <div className="option-item">
                        <Select placeholder="Select a Subject" optionFilterProp="children" onChange={(value) => handleSubject(value)} allowClear>
                            <Option value="all">All Subjects</Option>
                            {subjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {(state?.cbtQuestions[3].length > 0 && state.cbtUser.role !== "student") && (
                    <div className="option-item">
                        <Select placeholder="Select a Class" optionFilterProp="children" onChange={(value) => handleClass(value)}>
                            <Option value="all">All Classes</Option>
                            {cbtClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {(state?.cbtQuestions[3].length > 0 && state.cbtUser.role !== "student") && (
                    <div className="option-item">
                        <Select placeholder="Select a Term" optionFilterProp="children" onChange={(value) => handleTerm(value)} allowClear>
                            <Option value="all">All Terms</Option>
                            {terms.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {(state?.cbtQuestions[3].length > 0 && state.cbtUser.role !== "student") && (
                    <div className="option-item">
                        <Select placeholder="Select a Category" optionFilterProp="children" onChange={(value) => handleCategory(value)}  allowClear>
                            <Option value="all">All Categories</Option>
                            {cbtCategories.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {(state?.cbtQuestions[3].length > 0 && state.cbtUser.role === "admin") && (
                    <div className="option-item">
                        <Popconfirm
                            title="Are you sure to delete all questions?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}
                            onConfirm={ () => deleteAllConfirm() }
                        >
                            <Button className='delete-button'>
                                <DeleteOutlined  /> Delete All Questions
                            </Button>
                        </Popconfirm>
                    </div>
                )}
            </div>

            { (questions.length < 1 && state.cbtUser.role !== "student") && (
                <Text strong level={1}>
                    Currently there are no Exam Questions available at the moment...
                </Text>
            )}

            {(questions.length > 0 && state.cbtUser.role !== "student") && (
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {questions?.map((item) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={ item.$key  }>
                            <Card title={`${item.subject.toUpperCase() } - (${getClassName(item.className)}) - ${item.category.toUpperCase()}`} hoverable>
                                <p>
                                    <b>Question {questions.indexOf(item) + 1}:</b> {item.question}
                                </p>
                                <p>
                                    <b>A:</b> {item.optionA}
                                </p>
                                <p>
                                    <b>B:</b> {item.optionB}
                                </p>
                                <p>
                                    <b>C:</b> {item.optionC}
                                </p>
                                <p>
                                    <b>D:</b> {item.optionD}
                                </p>
                                <p>
                                    <b>Answer:</b> {item.answer}
                                </p>

                                {(state.cbtUser.role === "admin" || item.creator === state.cbtUser.accessCode ) && (
                                    <div className="action">
                                        <Popover
                                            placement='bottomLeft'
                                            content={ <EditQuestionForm question={item} />}
                                            title= {() => (<Title level={2} className='add-user-title'><b>Edit Existing Question</b> <Button onClick={ () => setEditQuestionPopover(false) } className='add-user-button'><CloseOutlined /></Button></Title>)}
                                            trigger='click'
                                            visible={ editQuestionPopover && (item.$key === details.$key) }
                                        >
                                            <Button className='edit-button' onClick={ () => onEdit(item) }>
                                                <EditOutlined  />
                                            </Button>
                                        </Popover>
                                        <Popconfirm
                                            title="Are you sure to delete this question?"
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
        </Fragment>
    )
}

export default Questions
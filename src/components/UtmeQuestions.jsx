import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Select, Typography, Button, Popover, Popconfirm } from "antd"
import { UtmeAddQuestionForm } from '../components'
import { GlobalContext } from '../app/GlobalState'
import HTMLReactParser from "html-react-parser"
import { utmeSubjects, examTypes } from '../services/userHelper';
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import '../styles/Questions.scss'

const { Fragment } = React
const { Title, Text } = Typography
const { Option } = Select

const initialQuestions = {
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    className: "",
    term: "",
    category: "",
    subject: ""
}

const UtmeQuestions = () => {
    const { state, deleteUtmeQuestion, getUtmeQuestions } = useContext(GlobalContext)
    const [newQuestionPopover, setNewQuestionPopover] = useState(false)
    const [editQuestionPopover, setEditQuestionPopover] = useState(false)
    const [questions, setQestions] = useState([])
    const [details, setDetails] = useState({ $key: 'gfsgdfgdew4rrewtr5e' })

    const deleteConfirm = (key) => {
        deleteUtmeQuestion(key)
    }

    const deleteAllConfirm = () => {
        questions.forEach(question => {
            deleteUtmeQuestion(question.$key)
        })
    }

    const onEdit = (object) => {
        setEditQuestionPopover(true)
        setDetails(object)
    }

    useEffect(() => {
        const filteredData = state?.utmeQuestions[3]
        setQestions(filteredData)
    }, [state.utmeQuestions])

    const handleSubject = (value) => {
        if (value === 'all') {
            setQestions(state?.utmeQuestions[3])
        } else {
            const filteredData = state?.utmeQuestions[3].filter((question) => question.subject === value)
            setQestions(filteredData)
        }
    }

    const handleExamType = (value) => {
        if (value === 'all') {
            setQestions(state?.utmeQuestions[3])
        } else {
            const filteredData = state?.utmeQuestions[3].filter((question) => question.examType === value || question.examType === "posr-utme-aaua" || question.examType === "post-utme-aaua")
            setQestions(filteredData)
        }
    }

    return (
        <Fragment>
            {questions.length !== 0 && state.cbtLoggedIn && state.cbtUser.role !== "student" && (
                <Title level={2} className="home-title">
                    All {questions.length} Exam Questions Sorter
                </Title>
            )}


            <div className="exam-question-sorter">
                {(state.cbtLoggedIn && state.cbtUser.role !== "student" && state.cbtLoggedIn) && (
                    <div className="option-item">
                        <Popover
                            placement='bottomRight'
                            content={<UtmeAddQuestionForm question={initialQuestions} />}
                            title={() => (<Title level={2} className='add-user-title'><b>{initialQuestions.question === "" ? "Add New Question" : "Edit Existing Question"}</b> <Button onClick={() => setNewQuestionPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                            trigger='click'
                            visible={newQuestionPopover}
                        >
                            <Button className='add-button' onClick={() => setNewQuestionPopover(true)}>
                                <PlusOutlined />  Add Question
                            </Button>
                        </Popover>
                    </div>
                )}
                {state.cbtUser.role !== "student" && state.cbtLoggedIn && (
                    <div className="option-item">
                        <Button className='get-button' onClick={() => getUtmeQuestions()}>
                            <ReloadOutlined /> Reload
                        </Button>
                    </div>
                )}
                {(state?.utmeQuestions[3].length > 0 && state.cbtUser.role !== "student" && state.cbtLoggedIn) && (
                    <div className="option-item">
                        <Select placeholder="Select a Subject" optionFilterProp="children" onChange={(value) => handleSubject(value)} allowClear>
                            <Option value="all">All Subjects</Option>
                            {utmeSubjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {(state?.utmeQuestions[3].length > 0 && state.cbtUser.role !== "student" && state.cbtLoggedIn) && (
                    <div className="option-item">
                        <Select placeholder="Select an Exam Type" optionFilterProp="children" onChange={(value) => handleExamType(value)} allowClear>
                            <Option value="all">All Exam Type</Option>
                            {examTypes.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {(state?.utmeQuestions[3].length > 0 && state.cbtUser.role === "admin" && state.cbtLoggedIn) && (
                    <div className="option-item">
                        <Popconfirm
                            title="Are you sure to delete all questions?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => deleteAllConfirm()}
                        >
                            <Button className='delete-button'>
                                <DeleteOutlined /> Delete All Questions
                            </Button>
                        </Popconfirm>
                    </div>
                )}
            </div>

            {(questions.length < 1 && state.cbtUser.role !== "student" && state.cbtLoggedIn) && (
                <Text strong level={1}>
                    Currently there are no Exam Questions available at the moment...
                </Text>
            )}

            {(questions.length > 0 && state.cbtUser.role !== "student" && state.cbtLoggedIn) && (
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {questions?.map((item) => (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.$key}>
                            <Card title={`${item.subject.toUpperCase()} --- ${item.examType.toUpperCase()}`} hoverable>
                                {item.image !== "" && (
                                    <img src={item.image} className='question-logo' alt={item.question} />
                                )}
                                <p>
                                    <b>Question {questions.indexOf(item) + 1}:</b> {HTMLReactParser(item.question)} <b><i>({item.examYear})</i>:</b>
                                </p>
                                <p>
                                    <b>A:</b> {HTMLReactParser(item.optionA)}
                                </p>
                                <p>
                                    <b>B:</b> {HTMLReactParser(item.optionB)}
                                </p>
                                <p>
                                    <b>C:</b> {HTMLReactParser(item.optionC)}
                                </p>
                                <p>
                                    <b>D:</b> {HTMLReactParser(item.optionD)}
                                </p>
                                <p>
                                    <b>Answer:</b> {HTMLReactParser(item.answer)}
                                </p>
                                {item.solution !== "" && (
                                    <p>
                                        <b>Solution:</b> {HTMLReactParser(item.solution)}
                                    </p>
                                )}

                                {(state.cbtUser.role === "admin" || item.creator === state.cbtUser.accessCode) && (
                                    <div className="action">
                                        {(state.cbtLoggedIn && state.cbtUser.role === "admin") && (
                                            <Popover
                                                placement='bottomLeft'
                                                content={<UtmeAddQuestionForm question={item} />}
                                                title={() => (<Title level={2} className='add-user-title'><b>Edit Existing Question</b> <Button onClick={() => setEditQuestionPopover(false)} className='add-user-button'><CloseOutlined /></Button></Title>)}
                                                trigger='click'
                                                visible={editQuestionPopover && (item.$key === details.$key)}
                                            >
                                                <Button className='edit-button' onClick={() => onEdit(item)}>
                                                    <EditOutlined />
                                                </Button>
                                            </Popover>
                                        )}
                                        {(state.cbtLoggedIn && state.cbtUser.role === "admin") && (
                                            <Popconfirm
                                                title="Are you sure to delete this question?"
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                onConfirm={() => deleteConfirm(item.$key)}
                                            >
                                                <Button className='delete-button'>
                                                    <DeleteOutlined />
                                                </Button>
                                            </Popconfirm>
                                        )}
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

export default UtmeQuestions
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Select, Alert } from 'antd'
import { BookOutlined  } from '@ant-design/icons'
import '../styles/CbtSelectExamForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Option } = Select

const CbtSelectExamForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { state, examCategory  } = useContext(GlobalContext)

    const onFinish = async (values) => {
        !production && (console.log("Select Exam data accepted !!", values))
        setFormError('')
        setFormMessage('Select Exam data accepted !!')

        examCategory(values.examType)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Select Exam data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Select Exam data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    return (
        <React.Fragment>
            <div className="form-group">
                { (!production || (state.user.role === 'admin' && state.showAlert)) && (
                    <div className="form-alert">
                        { formMessage !== '' && (
                            <Alert message={formMessage} type="success" showIcon closable />
                        )}
                        { formError !== '' && (
                            <Alert message={formError} type="error" showIcon closable />
                        )}
                    </div>
                )}
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                    <Alert className="information-alert" message="Exam Instructions" description="You are required to answer 20 questions in 30 minutes. Make sure you submit on completion of all the questions" type="info" showIcon />
                    <Item className='form-item' name="examType" label="Exam Type" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Type" defaultValue={state.cbtUser.category}  allowClear>
                            <Option value="current">Current</Option>
                            <Option value="junior">Junior</Option>
                            {(state.cbtUser.category !== 'junior' && state.cbtUser.category !== null) && (
                                <Option value="science">Science</Option>
                            )}
                            {(state.cbtUser.category !== 'junior' && state.cbtUser.category !== null) && (
                                <Option value="arts">Arts</Option>
                            )}
                            {(state.cbtUser.category !== 'junior' && state.cbtUser.category !== null) && (
                                <Option value="commercial">Commercial</Option>
                            )}
                        </Select>
                    </Item>
                    <Item>
                        <Link to="/benion-cbt/exams">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Start Exams <BookOutlined />
                            </Button>
                        </Link>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default CbtSelectExamForm

import React, { useState, useContext } from 'react'
import { Form, Button, Alert, Checkbox } from 'antd'
import { BookOutlined  } from '@ant-design/icons'
import '../styles/CbtSelectExamForm.scss'
import { production, utmeSubjects } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form

const UtmeSelectExamForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const [selectedSubjects, setSelectedSubjects] = useState(['english'])
    const { state, utmeExamSubjectCategory  } = useContext(GlobalContext)

    let studentCategory = 'senior'
    let studentSubject = 'maths'

    if (state.tempClassName[0] === 'j') {
        studentCategory = 'junior'
    }

    if (state.tempCbtSchool === 'vss' && studentCategory === 'senior') {
        studentSubject = 'geography'
    } else if (state.tempCbtSchool === 'vss' && studentCategory === 'junior') {
        studentSubject = 'basic-science'
    }

    const formInitials = {
        examTerm: state.cbtExamTerm,
        examCategory: state.tempCategory,
        examSubject: studentSubject,
        examClass: state.tempClassName
    }

    form.setFieldsValue(formInitials)

    const onFinish = (values) => {
        !production && (console.log("Select Exam data accepted !!", values))
        setFormError('')
        setFormMessage('Select Exam data accepted !!')
        const selectedValues = { 
            subject1: selectedSubjects[0], 
            subject2: selectedSubjects[1], 
            subject3: selectedSubjects[2], 
            subject4: selectedSubjects[3] 
        }
        console.log("Exam Values", values)
        utmeExamSubjectCategory(selectedValues)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Select Exam data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Select Exam data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    const handleSelectSubject = (event, value) => {
        let oldSubjects = [...selectedSubjects]
        if (event.target.checked) {
            if (!(oldSubjects.includes(value)) && oldSubjects.length < 4) {
                oldSubjects.push(value)
            }
        } else {
            oldSubjects = oldSubjects.filter(subject => subject !== value)
        }
        setSelectedSubjects(oldSubjects)
        console.log(oldSubjects)
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
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={formInitials} onFinish={ onFinish }>
                    <Alert className="information-alert" message="Exam Instructions" description={`${state.tempCbtFirstname.toUpperCase()} ${state.tempCbtLastname.toUpperCase()}, you are required to answer ${state.totalQuestions} questions in ${state.examTimeLimit} minutes. Select English and three other subjects to get started. Make sure to submit on completion of all the questions.`} type="info" showIcon />
                    <div className="item-list">
                        {utmeSubjects.filter(item => item.value === "english").map(item => (
                            <Item name="english" valuePropName={item.value} noStyle>
                                <Checkbox checked disabled className='input-label'>{item.name}</Checkbox>
                            </Item>
                        ))}
                        {utmeSubjects.filter(item => item.value !== "english").map(item => (
                            <Item name={item.value} valuePropName={item.value} noStyle>
                                <Checkbox disabled = {selectedSubjects.length >= 4 && !selectedSubjects.includes(item.value)} onClick={ (event) => handleSelectSubject(event, item.value)} className='input-label'>{item.name}</Checkbox>
                            </Item>
                        ))}
                    </div>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" disabled={selectedSubjects.length < 4}>
                            Start Exams <BookOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default UtmeSelectExamForm

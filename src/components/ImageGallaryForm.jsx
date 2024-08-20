import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Typography, Upload, Select, Progress } from 'antd'
import { GlobalOutlined, BookOutlined, BulbOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons'
import '../styles/ImageGallaryForm.scss'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'
import storage from '../services/firebase'

const { Item } = Form
const { Option } = Select
const { Title } = Typography
const { Dragger } = Upload

const ImageGallaryForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const [image, setImage] = useState(null)
    const [percent, setPercent] = useState(0)
    const [fileList, setFileList] = useState(null)
    const { addImage, state  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')
        
        upload(values)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Input data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Input data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    const normFile = (uploadEvent) => {
        if (Array.isArray(uploadEvent)) {
            return uploadEvent
        }

        if (uploadEvent.file.status === 'done') {
            previewImage(uploadEvent.file)
            setFileList(uploadEvent.file)
            !production && (console.log("Upload Event", uploadEvent))
        }

        return uploadEvent?.fileList
    }

    const previewImage = async (file) => {
        setFileList(null)
        setPercent(0)
        let src = file.url

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj)
                reader.onload = () => resolve(reader.result)
            })
        }

        setImage({
            name: file.name,
            src
        })
    }

    const upload = (values) => {
        if (fileList !== null) {
            // Extract file extension
            const fileExtension = fileList.name.split('.').pop();
            const path = `${values.category}/${values.caption}_${new Date().getTime()}.${fileExtension}`;
            
            const storageRef = ref(storage, path);
            
            // Create metadata with the correct MIME type
            const metadata = {
                contentType: fileList.type,  // Automatically sets the MIME type
            };
            
            const uploadTask = uploadBytesResumable(storageRef, fileList, metadata);
            
            uploadTask.on('state_changed', (snapshot) => {
                const uploadPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // Update progress
                setPercent(uploadPercent);
            }, (error) => !production && (console.log("Image Upload Error", error)), () => {
                // Download URL
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const data = { ...values, image: url };
                    !production && (console.log("Image Url", data));
                    addImage(data);
                });
                setImage(null);
            });
            form.resetFields();
        } else {
            !production && (console.log("Please Select an Image !!"));
            setFormMessage('');
            setFormError('Please Select an Image !!');
        }
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
                <div className="form-alert">
                    { state.formError !== '' && (
                        <Alert message={state.formError} type="warning" showIcon closable />
                    )}
                </div>
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } initialValues={{ remember: true }} validateMessages={ validateMessages } onFinish={ onFinish }>
                    <Title level={4} className="text">UPLOAD IMAGE</Title>
                    { image !== null && (
                        <div className="image">
                            <img src={ image.src } alt="Display Target" />
                            <p>{ image.name }</p>
                        </div>
                    )}
                    { image === null && (
                        <Item label="Dragger">
                            <Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle hasFeedback>
                                <Dragger accept="image/*" name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag to this area to upload.</p>
                                    <p className="ant-upload-hint">Support for single or bulk upload.</p>
                                </Dragger>
                            </Item>
                        </Item>
                    )}
                    <Item label="Upload" name="upload" valuePropName="fileList" getValueFromEvent={normFile} hasFeedback>
                        <Upload name="upload" accept="image/*" action="/upload.do" listType="picture" allowClear>
                            <Button icon={<UploadOutlined />}>Click to upload an image</Button>
                        </Upload>
                    </Item>
                    <Item className='form-item' label="Title" name="caption" hasFeedback rules={[ { required: true } ]}>
                        <Input prefix={<BookOutlined />}  placeholder="Image Title" allowClear />
                    </Item>
                    <Item className='form-item' label="Link" name="link" hasFeedback>
                        <Input prefix={<GlobalOutlined />}  placeholder="Add a Web Link" allowClear />
                    </Item>
                    <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Category"  allowClear>
                            <Option value="Work">Work</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    <Item className='form-item' name="tag" label="Tag" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Tag"  allowClear>
                            <Option value="angular">Angular</Option>
                            <Option value="react">React</Option>
                            <Option value="vanilla">Vanilla</Option>
                            <Option value="python">Python</Option>
                            <Option value="express">Express</Option>
                            <Option value="laravel">Laravel</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    { (percent > 0 && fileList !== null) && (
                        <Progress percent={percent} />
                    )}
                    { (percent > 99) && (
                        <p>Upload completed successfully ({percent})%...</p>
                    )}
                    { (percent > 0 && percent < 100) && (
                        <p>Upload in progress ({percent})%...</p>
                    )}
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Upload <BulbOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default ImageGallaryForm

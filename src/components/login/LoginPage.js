import React from 'react'
import {Form, Input, Button} from 'antd';
import logo from '../../img/sibdev-logo.png'
import 'antd/dist/antd.css';
import css from './login.module.css'

const layout = {
    labelCol: {
        span: 6,
        offset: 6
    },
    wrapperCol: {
        offset: 6,
        span: 12,
    },

};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 12,
    },
};

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={css.wrapper}>
            <div>
                <img src={logo} alt="SibDev"/>
            </div>
            <div className={css.enter}>
                Вход
            </div>
            <Form
                {...layout}
                layout={'vertical'}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин!!!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль!!!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button size={'large'}  type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login
import styles from '../../styles/form.module.scss';
import {Button, Form, Input, message, Modal} from 'antd';
import {loginHandler, resetPasswordHandlerOne} from './FormManager';
import logo from '../../assets/images/logo.jpeg';
import {useEffect, useState} from 'react';
import {useClientError} from '../../hooks/useClientError';
import {Link, useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [resetPasswordForm] = Form.useForm();
  const navigate = useNavigate();
  const clientError = useClientError();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      message.success('Giriş yapmış kullanıcı mevcut.')
      navigate('/')
    }
  }, [])

  const resetPasswordFormHandler = (formValues) => {
    resetPasswordHandlerOne(formValues).then(response => {
      if (response.status === 200) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    }).catch(error => {
      clientError(error);
    })
  }

  const loginFormHandler = (formValues) => {
    setLoginLoading(true);
    const isEmpty = Object.values(formValues).every(x => x === null || x === '');
    if (!isEmpty) {
      loginHandler(formValues).then(response => {
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.attr.access_token);
          navigate('/');
          setLoginLoading(false);
          return message.success(response.data.message);
        } else {
          setLoginLoading(false);
          return message.error(response.data.message);
        }
      }).catch(error => {
        clientError(error);
        setLoginLoading(false);
      })
    } else {
      setLoginLoading(false);
      return message.error('Giriş yapmak için lütfen alanları doldurunuz.');
    }
  }

  return <div className={styles['formWrapper']}>
    <Form className={styles['form']} form={loginForm} onFinish={loginFormHandler}>
      <img
        src={logo}
        alt='Company Logo'
      />
      <Form.Item rules={[{required: true, message: 'Bu alan zorunludur.'}]} name='email'>
        <Input placeholder='Email'/>
      </Form.Item>
      <Form.Item rules={[{required: true, message: 'Bu alan zorunludur.'}]} name='password'>
        <Input type='password' placeholder='Şifre'/>
      </Form.Item>
      <Button loading={loginLoading} type='primary' htmlType='submit'>
        Giriş Yap
      </Button>
      <div className={styles['actionWrapper']}>
        <Link to='/register'>Kayıt Ol</Link>
        <Button onClick={() => setResetPassword(true)} type='dashed'>Şifremi Unuttum</Button>
      </div>
    </Form>
    <Modal
      destroyOnClose={true}
      width={600}
      title='Şifre Sıfırlama'
      open={resetPassword}
      onCancel={() => setResetPassword(false)}
      footer={false}>
      <Form
        form={resetPasswordForm}
        className={styles['form']}
        onFinish={resetPasswordFormHandler}
      >
        <p>
          Girdiğiniz e-posta adresi sistemimizde kayıtlı ise, bir doğrulama kodu gönderilecektir.
        </p>
        <Form.Item rules={[{required: true, message: 'Bu alan zorunludur.'}]} name='email'>
          <Input placeholder='Email'/>
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Kurtarma Maili Gönder!
        </Button>
      </Form>
    </Modal>
  </div>
}

export default LoginForm;
import React from 'react';
import './register.css';
import { Form, Input, Button } from 'antd';
import axios from "axios"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { setUserID } from "../../actions/actions";

//Need React Router to import and use for routing to home on successful registration

//Need endpoints to point to for when data is submitted via form

const RegisterForm = props => {

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', { username: values.username, password: values.password });
        axios
          .post("https://gitstatus-app.herokuapp.com/api/auth/register", { username: values.username, password: values.password }/*stripping out values.confirm */)
          .then(() => {
            //kinda weird but now that we registered I'm going to login for the user to get the token so we don't have to redirect them to /login
            axios
              .post("https://gitstatus-app.herokuapp.com/api/auth/login", values)
              .then((res) => {
                console.log("Login successful ", res.data.token);
                localStorage.setItem('token', res.data.token);
                props.setUserID(res.data.id);
                props.history.push('/');
              })
              .catch((err) => { alert("ERROR LOGGING IN \n " + err) })
          })
          .catch((err) => { alert("ERROR REGISTERING \n " + err) })
      }
    });
  };


  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== props.form.getFieldValue('password')) {
      callback('Your passwords do not match.');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      props.form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="loginAndRegisterForm">
      <Form onSubmit={handleSubmit} className='register-form'>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input a username',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='register-form-button'>
            Register
            </Button>
          {/* Need to route here to the Login page */}
          Already have an account? <Link to="/login">Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

const Register = Form.create({ name: 'register' })(RegisterForm);

const mapStateToProps = state => ({
  userID: state.userID
});
export default connect(
  mapStateToProps,
  { setUserID }
)(Register);


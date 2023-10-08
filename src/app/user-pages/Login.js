import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Alert } from "reactstrap";
import axios from 'axios';

export class Login extends Component {
  constructor(){
    super();
    this.state = {
      msg : "" ,
      loginName : "",
      loginPassword : "",
    }
  }
  
  onSubmit=()=>{

    const{loginName,loginPassword} = this.state

    console.log(loginName,loginPassword)

    // Axios.post("http://localhost:5001/users/login",{loginName:loginName , loginPassword:loginPassword }).then
    axios.post("http://localhost:5001/users/login", {loginName:loginName , loginPassword:loginPassword }).then((response)=>{
      if(response.data.msg){
        this.setState({msg : response.data.msg})
      }else{
        this.setState({msg :""})
      }

    console.log(response)
    })

  }

  onChange = (e) =>{

    this.setState({[e.target.name] : e.target.value})

  }


  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                {/* <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div> */}
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3">
                  {this.state.msg ? <Alert color="danger"> {this.state.msg}</Alert> : ""}
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Username" name='loginName' size="lg" onChange={(e)=>this.onChange(e)} className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Password" size="lg" name='loginPassword' onChange={(e)=>this.onChange(e)} className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"  onClick={this.onSubmit} >SIGN IN</Link>
                  </div>
                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                  </div> */}
                  {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div> */}
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register-1" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login

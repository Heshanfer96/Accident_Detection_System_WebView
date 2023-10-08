import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from "reactstrap";
import axios from 'axios';

export class Register extends Component {

  constructor(){
    super();
    this.state = {
      userName : "",
      passWord : "" ,
      email : "" ,
    }
  }

  onchange = (e) =>{

    // console.log(e.target.value)
    // console.log(e.target.name)

    this.setState({[e.target.name] : e.target.value})
  }

  onSumbit = () =>{

    const {userName,passWord,email} = this.state

    if ( !userName || !passWord || !email){
      this.setState({
        msg : "Fill all columns "
      })
    }else{

      axios.post("http://localhost:5001/users/register",{userName:userName , passWord:passWord , email:email}).then((response)=>{
        console.log(response)
        if(response.data.msg){         
          this.setState({ msg : response.data.msg})
        }else{
          this.setState({
            msg : ""
          })
        }
      })
    }

    console.log(userName,passWord,email)
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                {/* <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>New here?</h4> */}
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : ""}  
                <form className="pt-3">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" name='userName' onChange={(e)=>this.onchange(e)} placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" name='email' onChange={(e)=>this.onchange(e)} placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                      <option>Country</option>
                      <option>United States of America</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Germany</option>
                      <option>Argentina</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" name='passWord' onChange={(e)=>this.onchange(e)} placeholder="Password" />
                  </div>
                  {/* <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div> */}
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.onSumbit} >SIGN UP</Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register

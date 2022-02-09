/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState } from "react";
import {authAxios} from "../services/httpServices"
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row
  } from "reactstrap";
import { useStateValue } from "./StateProvider";
  
  const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{user}, dispatch] = useStateValue()
    
    console.log("This is the user's name", user)
    const submit= async (e) =>{
      e.preventDefault();
          try {
              const {data} = await authAxios.post("user/login/", {"email":email,"password":password})
              localStorage.setItem("access_token", data.access)
              localStorage.setItem("refresh_token", data.refresh)
              authAxios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem("access_token")
              window.location = `/`;
              
          } catch (ex) {
              if (ex.response && ex.response.status === 400){
                  console.log(ex.response.data)
                  // setError(ex.response.data)
              }
          }
      }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            
            <CardBody className="px-lg-5 py-lg-5">
            
              <div className="text-center text-muted mb-4">
                <i className="fas fa-user fa-5x"/>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e)=> setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" onClick={submit}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };
  
  export default Login;
  
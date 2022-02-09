import { Select } from '@material-ui/core';
import { authAxios } from 'app/services/httpServices';
import Header from 'components/Headers/Header';
import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Redirect } from 'react-router';
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
    Container,
    CardHeader,
    Row
  } from "reactstrap";

const NewStaff = (props) => {
    const roles = [
        {id:1, post:'ADMIN'},
        {id:2, post:'MANAGER'},
        {id:3, post:'PHARMACIST'},
    ]
    const genders = [
        {id:1, name:'MALE'},
        {id:2, name:'FEMALE'},
    ]
    const [first_name, setFirstName]=useState('')
    const [last_name, setLastName]=useState('')
    const [email, setEmail]=useState('')
    const [contact, setContact]=useState('')
    const [gender, setGender]=useState('')
    const [role, setRole]=useState('')
    const [profile, setProfile]=useState('')
    const [branch, setBranch]=useState('')
    const [branches, setBranches]=useState([])

    const history = useHistory()

    useEffect(() => {
        async function getBranches(){
          const {data} = await authAxios.get('pharm/branches')
          setBranches(data) 
        }
        getBranches()
    },[])

    const  getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    const  handleFileInputChange = e => {
            let file
        
            file = e.target.files[0];
        
            getBase64(file)
            .then(result => {
                setProfile(result)
            })
            .catch(err => {
                console.log(err);
            });
    }
    
        const submit= async (e) =>{
            e.preventDefault();
                try {
                    await authAxios.post("staff/staff/", {
                    "first_name":first_name,
                    "last_name":last_name,
                    "email":email,
                    "contact":contact,
                    "gender":gender,
                    "branch":branch,
                    "role":role,
                    "image":profile,
                    })
                    history.push('/admin/staff')
                    // window.location = `/staff`;    
                } catch (ex) {
                    if (ex.response && ex.response.status === 400){
                        console.log(ex.response.data)
                        // setError(ex.response.data)
                    }
                }
            }

    
    
    
    return(
        <div>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader>
                            <div className="d-flex">
                                <div className="p-2 flex-grow-1 ">
                                    <h4>Add New Staff</h4>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        </InputGroupAddon>
                                        <Input
                                        placeholder="Please Input First Name"
                                        type="text"
                                        autoComplete="new-firstName"
                                        onChange={(e)=> setFirstName(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        </InputGroupAddon>
                                        <Input
                                        placeholder="Please Input Last Name"
                                        type="text"
                                        autoComplete="new-lastName"
                                        onChange={(e)=> setLastName(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        </InputGroupAddon>
                                        <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                    </InputGroupAddon>
                                    <Input
                                    placeholder="Contact"
                                    type="number"
                                    autoComplete="new-email"
                                    onChange={(e)=> setContact(e.target.value)}
                                    />
                                </InputGroup>
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <div className="d-flex">
                                        <div className="d-flex flex-grow-1">
                                            <div className="mr-5">Please select gender</div>
                                            <select name="gender" id="" onChange={(e)=> setGender(e.target.value)}>
                                                <option value="">--------</option>
                                                {genders.map(gender =>
                                                    <option value={gender.name}>{gender.name}</option>)}
                                            </select> 
                                        </div>
                                        <div className="d-flex">
                                            <div className="mr-5">Please select role</div>
                                            <select name="role" id="" onChange={(e)=> setRole(e.target.value)}>
                                                <option value="">--------</option>
                                                {roles.map(role =>
                                                    <option value={role.post}>{role.post}</option>)}
                                            </select> 
                                        </div>
                                    </div>
                                </FormGroup>
                                <div className="d-flex mt-5">
                                    <div className="d-flex flex-grow-1">
                                        Please select display image
                                        <FormGroup className="mb-3 ml-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                </InputGroupAddon>
                                                <Input
                                                type="file"
                                                autoComplete="new-image"
                                                onChange={handleFileInputChange}
                                                />
                                            </InputGroup>
                                        </FormGroup> 
                                    </div>
                                    <div className="d-flex">
                                        <div className="mr-5">Please select branch</div>
                                        <select name="role" id="" onChange={(e)=> setBranch(e.target.value)}>
                                            <option value="">--------</option>
                                            {branches.map(branch =>
                                                <option value={branch.id}>{branch.name}</option>)}
                                        </select> 
                                    </div>
                                </div>
                                <div className="text-center">
                                <Button className="my-4" color="primary" type="submit" onClick={submit}>
                                    Save
                                </Button>
                                </div>
                            </Form>
                        </CardBody>
                        </Card>
                    </div>
                    <div className="col-4 col-sm-12 col-md-4">
                        <Card>
                            <CardBody>
                                <img 
                                    src={profile ? profile:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII="}
                                    alt="" 
                                    height = '300px'
                                    width = '450px'
                                    />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </div>
  )
};

export default NewStaff;


import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'

const { default: Header } = require("components/Headers/Header")

const StaffDetails = (props) => {

    const [staff, setStaff] = useState([])
    const id = props.match.params.uuid
    useEffect(() => {
        async function getStaff(){
          const {data} = await authAxios.get(`staff/staff-details/${id}`)
          setStaff(data) 
        }
        getStaff()
    },[])

    console.log(staff)
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <h3 className="mb-0">{staff.first_name} {staff.last_name}</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                        {/* <ol className="list-group list-group-numbered">
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                First Name
                                                </div>
                                                <b><span className="">{staff.data.first_name}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Last Name
                                                </div>
                                                <b><span className="">{staff.data.last_name}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Email
                                                </div>
                                                <b><span className="">{staff.data.email}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Contact
                                                </div>
                                                <b><span className="">{staff.data.contact}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Gender
                                                </div>
                                                <b><span className="">{staff.data.gender}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Role
                                                </div>
                                                <b><span className="">{staff.data.role}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Staff ID
                                                </div>
                                                <b><span className="">#{staff.data.staffID}</span></b>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                Branch
                                                </div>
                                                <b><span className="">{staff.data.branch}</span></b>
                                            </li>
                                        </ol> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                <img src={staff.data.profile_image} alt="" height="300" width="300"/>
                                    {/* <div className="card">
                                        <div className="card-body">
                                            <img src={staff.profile_image} alt="" height="300" width="300"/>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </>
        );
}
 
export default StaffDetails
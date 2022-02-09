import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'
import { Link, Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
const { default: Header } = require("components/Headers/Header")

const Staff = (props) => {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        async function getStaff(){
          const {data} = await authAxios.get('staff/staff')
          setStaff(data) 
        }
        getStaff()
    },[staff])

    const staffDetailPage = staffUUID => {
        // history.push(`/admin/staff/${staffUUID}`)
        return <Link to={`/admin/staff-details/${staffUUID}`}><Button color='danger' >Details</Button></Link>
    }
   
    const columns = [
        {
            title: '#ID',
            field: 'id',
        },
        {
            title: 'First Name',
            field: 'fn',
        },
        {
            title: 'Last Name',
            field: 'ln',
        },
        {
            title: "Branch",
            field: 'ns',
        },
        {
            title: 'Action',
            field: 'action',
        },
    ];

    const data = staff ? staff.map(staff => (
           {
                id: staff.id,
                fn: staff.first_name,
                ln: staff.last_name,
                ns: "Kumasi",
                // action: <Button color='danger' onClick={(e)=>(deleteBranch(branch.id))}>Delete</Button>,
                action: staffDetailPage(staff.uuid),

            }
        )) : 'There is no data to display.';
    
    return ( 
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader>
                            <div className="d-flex">
                                <div className="p-2 flex-grow-1 ">
                                    <h2>All Staff</h2>
                                </div>
                                <div className="mt-0">
                                    <Link to="/admin/new-staff">
                                        <Button className="my-4 btn-sm" color="primary" type="submit">
                                         + <i className="fa fa-users"></i>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <MaterialTable 
                                title=''
                                data={data}
                                columns={columns}
                                options={{
                                    exportButton:true,
                                    searchAutoFocus:true,
                                    sorting:true
                                }}
                            />
                        </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </>
        );
}
 
export default Staff
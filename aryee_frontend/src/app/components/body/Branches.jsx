import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormGroup, InputGroup, InputGroupAddon, Input } from "reactstrap";
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import MaterialTable from "material-table";
import {authAxios} from '../../services/httpServices'
import {Link} from 'react-router-dom'

const { default: Header } = require("components/Headers/Header")

const Branches = (props) => {
    const [branchName, setBranchName]=useState('')
    const [branches, setBranches]=useState([])

    const history = useHistory()

    useEffect(() => {
        async function getBranches(){
          const {data} = await authAxios.get('pharm/branches')
          setBranches(data) 
        }
        getBranches()
    },[branches])
   
    const submit= async (e) =>{
        e.preventDefault();
            try {
                await authAxios.post("pharm/branches/", {
                "name":branchName,
                })
                history.push('/admin/branches')
                // window.location = `/staff`;    
            } catch (ex) {
                if (ex.response && ex.response.status === 400){
                    console.log(ex.response.data)
                    // setError(ex.response.data)
                }
            }
        }

    const columns = [
        {
            title: 'Name',
            field: 'nm',
        },
        {
            title: 'Number Of Staff',
            field: 'nos',
        },
        // {
        //     title: 'Supervisor',
        //     field: 'sp',
        // },
        {
            title: 'Action',
            field: 'action',
        },
    ];

    const data = branches && branches.map(branch => (
        {
            nm: branch.name,
            nos: "2",
            action: <Button color='danger' >Details</Button>,
         }
     ));
    
    
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
                                    <h4>All Branches</h4>
                                </div>
                                <div className="p-2 ">
                                    <Button color='primary' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">+ <i className="fa fa-building"></i></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <MaterialTable 
                                title='Branches'
                                data={data}
                                columns={columns}
                                options={{
                                    exportButton:true,
                                    searchAutoFocus:true,
                                    sorting:true
                                }}
                            />
                        </CardBody>
                        <div>
                            {/* Modal */}
                            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">New Branch</h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                        <FormGroup className="mb-5 ml-5">
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                placeholder="Enter New Branch Name"
                                                type="text"
                                                autoComplete="new-branchName"
                                                onChange={(e)=> setBranchName(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="button" className="btn bg-success" onClick={submit} data-bs-dismiss="modal"><span className="text-white">Create</span></button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </Card>
                    </div>
                </Row>
            </Container>   
        </>
        );
}
 
export default Branches
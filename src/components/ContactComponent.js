import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            telnumber:'',
            email:'',
            agree:false,
            contactType:'Tel.',
            message:'',
            touched: {
                firstname:false,
                lastname:false,
                telnumber:false,
                email:false
            }
        }
        this.buttonOnSubmitHandler = this.buttonOnSubmitHandler.bind(this);
        this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }

    inputOnChangeHandler = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name =  target.name;

        this.setState({
            [name]:value
        });
    }

    buttonOnSubmitHandler = (event) => {
        console.log("Current state is:" + JSON.stringify(this.state));
        alert("Current state is:" + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {
            ...this.state.touched,
            [field]:true
            }
        });
    }

    formValidation(firstname, lastname, telnumber, email) {
        const error = {
            firstname:'',
            lastname: '',
            telnumber:'',
            email: ''
        }
        if(this.state.touched.firstname && firstname.length < 3) 
            error.firstname = "First Name should be greater than 3 Characters"
        else if(this.state.touched.firstname && firstname.length > 10) 
            error.firstname = "First Name should not be Greater than 10 Characters"
        if(this.state.touched.lastname && lastname.length < 3) 
            error.firstname = "Last Name should be greater than 3 Characters"
        else if(this.state.touched.lastname && lastname.length > 10) 
            error.firstname = "Last Name should not be Greater than 10 Characters"
        
        const reg = /^\d+$/;

        if(this.state.touched.telnumber && !reg.test(telnumber))
            error.telnumber = "Tel. Number should only contain the Numbers"
        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            error.email = "Email should contain @"

        return error;
    }
    render() {
        const errors = this.formValidation(this.state.firstname, this.state.lastname, this.state.telnumber, this.state.email);
        return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>HOME</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        CONTACT US
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>CONTACT US</h3>
                    <hr/>
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us Your FEEDBACK</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.buttonOnSubmitHandler}>
                        <FormGroup row>
                            <Label htmlFor="firstname" className="col-md-2">First Name</Label>
                            <Col className="col-md-10">
                                <Input 
                                    type="text" 
                                    id="firstname" 
                                    name="firstname"
                                    placeholder="John"
                                    value={this.state.firstname}
                                    valid={errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={this.handleBlur('firstname')}
                                    onChange={this.inputOnChangeHandler}
                                />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Input 
                                    type="text" 
                                    id="lastname" 
                                    name="lastname"
                                    placeholder="Stark"
                                    value={this.state.lastname}
                                    valid={errors.lastname === ''}
                                    invalid={errors.lastname !== ''}
                                    onBlur={this.handleBlur('lastname')}
                                    onChange={this.inputOnChangeHandler}
                                />
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="telnumber" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Input 
                                    type="tel" 
                                    id="telnumber" 
                                    name="telnumber"
                                    placeholder="Tel. Number"
                                    value={this.state.telnumber}
                                    valid={errors.telnumber === ''}
                                    invalid={errors.telnumber !== ''}
                                    onBlur={this.handleBlur('telnumber')}
                                    onChange={this.inputOnChangeHandler}
                                />
                                <FormFeedback>{errors.telnumber}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email Address</Label>
                            <Col md={10}>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder="Johnstark@gmail.com"
                                    value={this.state.email}
                                    valid={errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur={this.handleBlur('email')}
                                    onChange={this.inputOnChangeHandler}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={{size:6, offset:2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input 
                                            type="checkbox" 
                                            name="agree"
                                            checked={this.state.agree}
                                            onChange={this.inputOnChangeHandler}
                                        /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size:3, offset:1}}>
                                <Input type="select" 
                                       name="contactType" 
                                       value={this.state.contactType}
                                       onChange={this.inputOnChangeHandler}
                                >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="feedback" md={2}>Your FeedBack</Label>
                            <Col md={10}>
                                <Input 
                                    type="textarea" 
                                    id="message" 
                                    name="message"
                                    rows="12"
                                    value={this.state.message}
                                    onChange={this.inputOnChangeHandler}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:10, offset:2}}>
                                <Button type="submit" color="primary">Send FeedBack</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
        );
    }
}

export default Contact;
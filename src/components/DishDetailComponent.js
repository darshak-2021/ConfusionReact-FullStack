import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, } from 'reactstrap';

function RenderComments({comments}) {
    console.log(comments)
    if(comments != null) {
        // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        const cmnts = comments.map(comment => {
            // var date = new Date(comment.date)
            // var month = months[date.getMonth()]
            // var finalDate = date.getDate();
            // var year = date.getFullYear();
            return(
                <li key={comment.id}> 
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                {/* <p> -- {commnet.author}, {month} {finalDate},{year} </p> */}
                </li>
            );
        });
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmnts}
                </ul>
            </div>
        );
    }
    else {
        return(
            <div>Goes Wrong...</div>
        );
    }
}
function RenderDish({dish}) {
    if(dish != null) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg  width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return(
            <div>Something is Wrong! Click Again...</div>
        );
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    console.log(dish)
    if(dish != null) {
        const dishItem = <RenderDish dish={props.dish}/>;
        const commentItem = <RenderComments comments={props.dish.comments}/>;
        return (
            <div className="container">
                <div className="row">
                    {dishItem}
                    {commentItem}
                </div>
            </div>     
        );
    }
    else {
        return(
            <div></div>
        );
    }
}


export default DishDetail;

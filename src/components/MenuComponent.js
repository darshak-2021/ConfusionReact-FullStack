import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import { LoadingSpinner } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({dish}) {
    const MenuItem = <Card>
        <Link to={`/menu/${dish.id}`}>
            <CardImg width="100%" src={ baseUrl + dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Link>
    </Card>;
    return(
        MenuItem
    );
}
const Menu = (props) => {

    const menu = props.dishes.dishes.map(dish => {
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
               <RenderMenuItem dish={dish}/>
            </div>
        );
    });
    if(props.dishes.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <LoadingSpinner/>
                </div>
            </div>
        );
    }
    else if (props.dishes.errMsg) {
        return(
            <div className="container">
                <div className="row">
                <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    else 
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to='/home'>HOME</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            MENU
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>MENU</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}
export default Menu;

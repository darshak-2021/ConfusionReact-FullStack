import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap'

function RenderMenuItem({dish,darshak}) {
    const MenuItem = <Card onClick={() => darshak(dish.id)}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
    </Card>;
    return(
        MenuItem
    );
}
const Menu = (props) => {
    const menu = props.dishes.map(dish => {
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
               <RenderMenuItem dish={dish} darshak={props.onDarshakDishSelect}/>
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    );
}
export default Menu;

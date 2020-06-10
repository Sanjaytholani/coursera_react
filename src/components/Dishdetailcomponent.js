import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
        return(
                <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
        );
  }
  function RenderComment({comments}){
        let commentlist=comments.map((comment)=>{
              return (
                  <li key={comment.id}>
                      {comment.comment}
                      <br></br><br></br>
                      --{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                      <br></br><br></br>
                  </li>
              );
          })
          return(
              <div>
                  <h4>Comment</h4>
                  <ul className="list-unstyled">
                      {commentlist}
                  </ul>
              </div>
          );
    }
  const DishDetail = (props)=> {
      if (props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                         </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment comments={props.dish.comments} />                     
                     </div>  
                </div>   
            </div>              
        );  
      }
      else
      return(<div></div>);
  }
export default DishDetail
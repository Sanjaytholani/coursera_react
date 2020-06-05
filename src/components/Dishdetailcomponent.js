import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class DishDetail  extends Component {
    constructor(props){
        super (props);

    }
    renderDishes(dish) {
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
  renderComment(comments){
      let commentlist=comments.map((comment)=>{
            return (
                <li key={comment.id}>
                    {comment.comment}
                    <br></br><br></br>
                    --{comment.author},{comment.date}
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
  render() {
      if (this.props.dish != null){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDishes(this.props.dish)}
                 </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComment(this.props.dish.comments)}
                </div>  
            </div>                  
        );  
      }
      else
      return(<div></div>);
  }
}
export default DishDetail
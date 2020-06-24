import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle,Breadcrumb, BreadcrumbItem,Button,Modal,ModalHeader,ModalBody, FormGroup,Form,Label  } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderDish({dish}) {
        return(
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
        );
  }
  function RenderComment({comments,postComment,dishId}){
        let commentlist=comments.map((comment)=>{
              return (
                  <Fade in>
                      <li key={comment.id}>
                      {comment.comment}
                      <br></br>
                      --{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                      <br/><br/>
                    </li>
                  </Fade>
              );
          })
          
          return(
              <div>
                  <h4>Comment</h4>
                  <ul className="list-unstyled">
                      <Stagger in>
                        {commentlist}
                      </Stagger>
                  </ul>
                  <CommentForm dishId={dishId} postComment={postComment} />
                  <br/>
                  <br/>
              </div>
          );
    }
  const DishDetail = (props)=> {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
      else if (props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                         </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment comments={props.comments} 
                         postComment={props.postComment}
                         dishId={props.dish.id}
                        />                     
                     </div>  
                </div>   
            </div>              
        );  
      }
      else
      return(<div></div>);
  }
  class CommentForm extends Component{
      constructor(props){
          super(props);
          this.toggleModal = this.toggleModal.bind(this);
          this.state={
              isModalOpen: false
          };
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
      render(){
          return (
              <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                  <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                  <FormGroup>
                      <Label htmlFor="rating">Rating</Label>
                      <Control.select model=".rating" name="rating" id="rating" className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Control.select>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="author">Your Name</Label>
                      <Control.text model=".author" name="author" id="author" className="form-control"
                      placeholder="Your Name" validators={{
                        minLength: minLength(3),maxLength: maxLength(15)
                    }}/>
                    <Errors 
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be less than 15 characters"
                      }}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="comment">Comment</Label>
                      <Control.textarea model=".comment" name="comment" id="comment" rows="6" className="form-control"/>
                  </FormGroup>
                  <Button type="submit" className="bg-primary">Submit</Button>
              </LocalForm>
                  </ModalBody>
              </Modal>
              </React.Fragment>
          );
      }
  }
export default DishDetail
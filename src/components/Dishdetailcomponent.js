import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle,Breadcrumb, BreadcrumbItem,Button,Modal,ModalHeader,ModalBody, FormGroup,Form,Label  } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
                      <br></br>
                  </li>
              );
          })
          return(
              <div>
                  <h4>Comment</h4>
                  <ul className="list-unstyled">
                      {commentlist}
                  </ul>
                  <CommentForm />
                  <br/>
                  <br/>
              </div>
          );
    }
  const DishDetail = (props)=> {
      if (props.dish != null){
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
                        <RenderComment comments={props.comments} />                     
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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                      <Label htmlFor="name">Your Name</Label>
                      <Control.text model=".name" name="name" id="name" className="form-control"
                      placeholder="Your Name" validators={{
                        minLength: minLength(3),maxLength: maxLength(15)
                    }}/>
                    <Errors 
                      className="text-danger"
                      model=".name"
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
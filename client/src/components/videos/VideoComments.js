import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
} from "reactstrap";
import { addComment, deleteComment } from "../../js/actions/commentsActions";
import CommentCard from "./CommentCard";

export class VideoComments extends Component {
  state = {
    // comments: this.props.comments.comments
    //   .filter((comment) => comment.id_video === this.props.currentVideo._id)
    //   .map(
    //     (comment) =>
    //       (comment={
    //         ...comment,
    //         user: this.props.users.users.find(
    //           (user) => user._id === comment.id_user
    //         )
    //       })
    //   ),
    newComment: {
      id_user: "",
      id_video: "",
      id_comment: "",
      message: "",
    },
  };

  checkComments=(comments)=>{
    return comments
      .filter((comment) => comment.id_video === this.props.currentVideo._id)
      .map(
        (comment) =>
          (comment = {
            ...comment,
            user: this.props.users.users.find(
              (user) => user._id === comment.id_user
            )
          })
      )
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      newComment: {
        message: e.target.value,
        id_user: this.props.auth.user._id,
        id_video: this.props.currentVideo._id,
        id_comment: "",
      },
    });
  };

  saveComment = (e) => {
    e.preventDefault();
    if (this.state.newComment.message)
      this.props.addComment(this.state.newComment);

    this.setState({
      ...this.state,
      newComment: {
        ...this.state.newComment,
        message: "",
      },
    });
  };

  render() {
    return (
      <Col className="col-4">
        <Card className="m-3 d-flex justify-content-between">
          <CardHeader>
            <CardTitle className="m-0 font-weight-bold text-primary">
              Comments
            </CardTitle>
          </CardHeader>
          <CardBody className="pt-1">
            {this.checkComments(this.props.comments.comments).map((comment) => (
              <CommentCard comment={comment} deleteComment={this.props.deleteComment} user={this.props.auth.user} />
            ))}

            <Form
              class="d-none d-sm-inline-block form-inline  ml-md-3 my-2 my-md-0 mw-100 navbar-search"
              onSubmit={this.saveComment}
            >
              <div class="input-group">
                <Input
                  type="text"
                  value={this.state.newComment.message}
                  onChange={this.handleChange}
                  class="form-control bg-light border-0 small"
                  placeholder="Your comment..."
                  aria-label="Comment"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <Button
                    class="btn btn-primary"
                    color="primary"
                    type="submit"
                    onClick={this.saveComment}
                  >
                    <i class="fas fa-comment-dots"></i>
                  </Button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  comments: state.comments,
  auth: state.auth,
});

export default connect(mapStateToProps, { addComment, deleteComment })(
  VideoComments
);

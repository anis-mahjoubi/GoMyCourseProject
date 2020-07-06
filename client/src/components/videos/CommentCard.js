import React from "react";
import { Button } from "reactstrap";

function CommentCard({ comment, deleteComment, user }) {
  if (!comment) return null;
  return (
    <div className="row justify-content-between mx-1 my-3 p-0">
      <p className="m-0">
        <b>{comment.user.name} : </b>
        <br />
        {comment.message}
      </p>
      {user._id === comment.user._id ? (
        <Button
          class="btn btn-danger"
          color="danger"
          type="button"
          onClick={() => deleteComment(comment._id)}
        >
          <i class="fas fa-times"></i>
        </Button>
      ) : null}
    </div>
  );
}
export default CommentCard;

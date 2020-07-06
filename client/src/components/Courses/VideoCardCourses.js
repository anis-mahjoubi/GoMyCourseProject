import React from "react";
import {
  Card,
  CardText,
  CardBody,
  Col,
  CardTitle,
  CardSubtitle,
  Button,
  CardHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import moduleName from "module";

function VideoCardCourses(props) {
  return (
    <Col className="col-6 mb-3">
      <Card>
        <CardHeader>
          <CardTitle className="m-0 font-weight-bold text-primary">{props.video.name}</CardTitle>
        </CardHeader>
        <CardBody>
          <img
            src={`http://img.youtube.com/vi/${props.video.link}/0.jpg`}
            style={{  maxWidth: "100%", height: "auto" }}
          />
          <CardText>{props.video.description}</CardText>

          <Link to={`/video/${props.video._id}`} style={{ color: "white" }}>
            <Button color="primary">Watch now</Button>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
}

export default VideoCardCourses;

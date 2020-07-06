import React from "react";
import { Card, CardText, CardBody, CardTitle, CardHeader, CardSubtitle, Col } from "reactstrap";

function VideoHeader(props) {
  return !props.video.name ? (
    <b>LOADING</b>
  ) : (
    <Col className="col-8">
    <Card className="m-3 d-flex justify-content-between">
        <CardHeader>
          <CardTitle className="m-0 font-weight-bold text-primary">{props.video.name}</CardTitle>
          <CardSubtitle className="m-0 font-weight-light text-secondary">By {props.author.name}</CardSubtitle>
      </CardHeader>
      <iframe
        width="80%"
        height="500em"
          src={`https://www.youtube.com/embed/${props.video.link}`}
        frameBorder="0"
        allowFullScreen
        className="mx-auto"
        title={props.video.name}
      ></iframe>
      <CardBody>
        {/* <CardSubtitle>{props.course.name}</CardSubtitle> */}
        <CardText>{props.video.description}</CardText>
      </CardBody>
    </Card>
      </Col>
  );
}

export default VideoHeader;

import React, { Component } from "react";
import {
  Card,
  CardImg,
  Col,
  Row,
  Container,
  Button,
  UncontrolledPopover,
  PopoverBody
} from "reactstrap";

export default class Instructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      copySuccess: ""
    };
  }

  componentDidMount(e) {
    this.getPosts();
  }

  getPosts() {
    const id = this.props.match.params.id;
    fetch("https://calm-island-47398.herokuapp.com/api/posts/" + id, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ data: result.result[0] });
      })
      .catch(err => console.log("error"));
  }

  copyToClipboard = e => {
    navigator.clipboard.writeText(window.location.href);
    this.setState({ copySuccess: "Copy Successful!" });
  };

  render() {
    const data = this.state.data;
    return (
      <Container fluid style={{ padding: "1em", minHeight: "100vh" }}>
        <Row>
          <Col sm="7">
            <Card>
              <CardImg
                src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074__340.jpg"
                className="card-img-top"
                alt={data ? data.title : "no alt"}
              />
            </Card>
          </Col>
          <Col>
            <h1 className="display-3">
              {data ? data.title : "No title provided"}
            </h1>
            <p className="lead">
              Group: {data ? data.ref_key : "No group added"}
            </p>
            <br />
            <br />
            <Button id="PopoverFocus" onClick={this.copyToClipboard}>
              Share
            </Button>
            <UncontrolledPopover
              trigger="focus"
              placement="top"
              target="PopoverFocus"
            >
              <PopoverBody>
                <span style={{ color: "green" }}>{this.state.copySuccess}</span>
              </PopoverBody>
            </UncontrolledPopover>
          </Col>
        </Row>
      </Container>
    );
  }
}

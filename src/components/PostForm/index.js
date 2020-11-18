import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PostForm = props => {
  const [modal, setModal] = useState(false);

  const [title, setTitle] = React.useState("");
  const [ref_key, setRefKey] = React.useState("");
  const [image, setImage] = React.useState("");

  const toggle = () => setModal(!modal);

  function handleSubmit(event) {
    event.preventDefault();
    savePosts();
  }

  const savePosts = () => {
    fetch("https://calm-island-47398.herokuapp.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        ref_key: ref_key,
        image: image
      })
    })
      .then(res => {
        res.json();
        window.location.reload(true);
      })
      .catch(err => console.log("error"));
  };

  let $imagePreview = null;
  if (image) {
    $imagePreview = <img style={{ width: "100%" }} src={image} />;
  } else {
    $imagePreview = (
      <div className="previewText">Please select an Image for Preview</div>
    );
  }

  return (
    <div className="form-styles">
      <Form inline onSubmit={e => e.preventDefault()}>
        <Button onClick={toggle}>
          <FontAwesomeIcon icon={faPlus} /> Post
        </Button>
      </Form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="ref_key">Group</Label>
                  <Input
                    type="text"
                    name="ref_key"
                    id="ref_key"
                    value={ref_key}
                    onChange={e => setRefKey(e.target.value)}
                    placeholder="Enter a Reference Key"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="url"
                name="image"
                id="image"
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="Enter a URL for your image"
                required
              />
            </FormGroup>
            <div className="imgPreview">{$imagePreview}</div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={handleSubmit}>
            Upload
          </Button>{" "}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostForm;

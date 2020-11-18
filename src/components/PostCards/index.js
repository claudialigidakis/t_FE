import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardColumns,
  CardBody,
  Form,
  FormGroup,
  Input,
  ButtonGroup,
  UncontrolledPopover,
  PopoverBody,
  Jumbotron,
  Container
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon
} from "react-share";

function PostCards() {
  const [data, setData] = useState([]);
  let [searchFilter, setFilter] = React.useState("all");
  const [copySuccess, setCopySuccess] = React.useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    if (!searchFilter) searchFilter = "all";
    fetch(
      "https://calm-island-47398.herokuapp.com/api/posts/search/" +
        searchFilter,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(result => {
        setData(result.result);
      })
      .catch(err => console.log("error"));
  };

  const copyToClipboard = id => {
    navigator.clipboard.writeText(window.location.href + `posts/` + id);
    setCopySuccess("Copy Successful!");
  };

  return (
    <Container fluid style={{ minHeight: "100vh", padding: "0px" }}>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Ruff Day?</h1>
          <p className="lead">
            Feel free to share your favorite pics of your furry friends! You can
            even group and search for them to really expedite some happiness!
          </p>
        </Container>
      </Jumbotron>
      <Container style={{ paddingBottom: "1em" }}>
        <Form
          inline
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1em"
          }}
        >
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="text"
              name="search-filter"
              id="search-filter"
              onChange={e => setFilter(e.target.value)}
              placeholder="Search for group"
            />
          </FormGroup>
          <Button onClick={getPosts}>Submit</Button>
        </Form>
        <CardColumns>
          {data &&
            data.map((element, index) => (
              <Card key={index}>
                <CardImg
                  src={
                    element.image
                      ? element.image
                      : "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074__340.jpg"
                  }
                  className="card-img-top"
                  alt={element.title}
                />
                <CardBody>
                  <CardTitle>{element.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted">
                    Group: {element.ref_key}
                  </CardSubtitle>
                </CardBody>
                <hr />
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "12px"
                  }}
                >
                  <div>
                    <Link to={"/post/" + element.id}>
                      <Button renderas="button">
                        <span>View</span>
                      </Button>
                    </Link>
                    <Button
                      onClick={e => copyToClipboard(element.id)}
                      id="PopoverFocus"
                      style={{ marginLeft: "2px" }}
                    >
                      Share
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus"
                    >
                      <PopoverBody>
                        <span style={{ color: "green" }}>{copySuccess}</span>
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                  <div>
                    <ButtonGroup>
                      <FacebookShareButton
                        url={"https://tellie.tv/"}
                        quote={`Tellie - ` + element.title}
                        hashtag={`#` + element.ref_key}
                      >
                        <FacebookIcon size={36} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        via={"https://tellie.tv/"}
                        title={`Tellie - ` + element.title}
                        hashtag={`#` + element.ref_key}
                      >
                        <TwitterIcon size={36} />
                      </TwitterShareButton>
                      <RedditShareButton
                        url={"https://tellie.tv/"}
                        title={`Tellie - ` + element.title}
                      >
                        <RedditIcon size={36} />
                      </RedditShareButton>
                    </ButtonGroup>
                  </div>
                </Container>
              </Card>
            ))}
        </CardColumns>
      </Container>
    </Container>
  );
}

export default PostCards;

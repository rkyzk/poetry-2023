import React from 'react'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from 'react';
import PoemsPage from '../poems/PoemsPage';

function Search() {
    const [filterValues, setFilterValues] = useState({
        author: "",
        title: "",
        keyword: "",
        category: "choose..."
    });
    const { author, title, keyword, category } = filterValues;
    const [search, setSearch] = useState(false);
    var filter = "published=1"

    if (author) {
      filter = filter + `&owner__profile__display_name__icontains=${author}`;
    }
    if (title) {
      filter = filter + `&title__icontains=${title}`;
    }
    if (keyword) {
      filter = filter + `&search=${keyword}`;
    }
    if (category !== "choose...") {
      filter = filter + `&category=${category}`;
    }

    const handleChange = (event) => {
        setFilterValues({
            ...filterValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleSearch = (event) => {
      setSearch(true);
      console.log(filter);
      console.log("hi");
    };    

    return (
      <Container>
        <h2>Search</h2>
          <i className={`fas fa-search`} />
          <Form
            onSubmit={(event) => event.preventDefault()}
          >
            <Row>
              <Col lg={4}>
                <Form.Group controlId="author">
                <Form.Label>author contains:</Form.Label>
                <Form.Control
                    value={author}
                    onChange={handleChange}
                    type="text"
                    name="author"
                    className="mr-sm-2"
                    placeholder="author"
                    />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="title">
                <Form.Label>title contains:</Form.Label>
                <Form.Control
                    value={title}
                    name="title"
                    onChange={handleChange}
                    type="text"
                    className="mr-sm-2"
                    placeholder="title"
                />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="keyword">
                <Form.Label>title/content contains:</Form.Label>
                <Form.Control
                    value={keyword}
                    name="keyword"
                    onChange={handleChange}
                    type="text"
                    className="mr-sm-2"
                    placeholder="keyword"
                />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group contorlId="category">
              <Form.Label className="my-1 mr-2">
                category
              </Form.Label>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
                custom
              >
                <option>choose...</option>
                <option>nature</option>
                <option>love</option>
                <option>people</option>
                <option>humor</option>
                <option>haiku</option>
                <option>other</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Button
            onClick={handleSearch}
          >
            search
          </Button>
        {search && (<PoemsPage filter={filter} />)}
      </Container>
    );
}

export default Search;
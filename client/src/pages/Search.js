import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "Harry Potter",
  };

  componentDidMount() {
    // this.loadBooks();
  }

  loadBooks = () => {
    API.searchBooks(this.state.title).then(res =>{
      this.setState({ books: res.data.items, title: ""})
      console.log(this.state.books)
    }
    
    )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    this.loadBooks(this.state.title);

   if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  hanleFormView = event => {

  }

  handleFormSave = event => {
    
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>React Google Book Search</h1>
              <h3> Search for and Save Books of Interest</h3>
            </Jumbotron>
            <Jumbotron>
              <h4> Book Search</h4>
              <h5> Book:</h5>
              <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Book Title (required)"
              />
               <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
              </form>
            </Jumbotron>
            {this.state.books.length ? (
              <List>                
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                <FormBtn
                onClick={this.handleFormView}
              >
                View
              </FormBtn>
              <FormBtn
                onClick={this.handleFormSave}
              >
                Save
              </FormBtn>                                
                    <Link to={"/books/" + book.id}>
                    <div className="row">
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors[0]}
                      </strong>
                      </div>                      
                    </Link>
                    <div className="row">
                      <img className="col-md-2" src={book.volumeInfo.imageLinks.smallThumbnail} >
                      </img>
                      <p className="col-md-10">
                      {book.volumeInfo.description}
                      </p>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;

import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Detail extends Component {
    state = {
        books: [],
        title: "",
    };

componentDidMount() {
     this.loadBooks();
}



loadBooks = () => {
    API.getBooks().then(res =>{
        this.setState({ books: res.data, title: ""})
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

handleFormSave = (event,book) => {
    console.log(book);
    API.saveBook({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        synosis: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks.smallThumbnail,
        link: book.volumeInfo.previewLink,
    })
        .then(res => res)
        .catch(err => console.log(err));
}

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



render() {
    return (
        <Container fluid>
        <Row>
        <Col size="md-12">
        <Jumbotron>
        <h1>React Google Book Search</h1>
        <h3> Search for and Save Books of Interest</h3>
        </Jumbotron>
{this.state.books.length ? (
    <List>                
    {this.state.books.map(book => (
     <ListItem key={book.id}>
    <a href={book.link}>
    <FormBtn              >
    View
    </FormBtn>
    </a>
           
    <FormBtn id={book.id} value={book.id}
    onClick={() => this.deleteBook(book.id)}
    >
    Delete
    </FormBtn>          
    
    <div className="row">
    <a href={book.link}> 
    <strong>
    {book.title} by {book.author}
    </strong>
    </a>
    </div>                      
    <div className="row">
    <img className="col-md-2" src={book.image} >
    </img>
    <p className="col-md-10">
    {book.title}
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

export default Detail;


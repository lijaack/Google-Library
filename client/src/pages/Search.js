import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
    state = {
        books: [],
        title: "",
    };

componentDidMount() {
}

loadBooks = () => {
    API.searchBooks(this.state.title).then(res =>{
        this.setState({ books: res.data.items, title: ""})
    })
        .catch(err => console.log(err));
};

deleteBook = book => {
    this.setState({
        books:   this.state.books.filter(item => { 
        return item !== book
        })
    })
};

handleFormSave = (book) => {
    this.setState({
        books:   this.state.books.filter(item => { 
        return item !== book
        })
    })
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
    <a href={book.volumeInfo.previewLink}>
    <FormBtn              >
    View
    </FormBtn>
    </a>
    <FormBtn id={book.id} value={book.id}
    // onClick={((e) => this.handleFormSave(e,book))}
    onClick={(() => this.handleFormSave(book))}
    >
    Save
    </FormBtn>          
    
    <div className="row">
    <a href={book.volumeInfo.previewLink}> 
    <strong>
    {book.volumeInfo.title} by {book.volumeInfo.authors[0]}
    </strong>
    </a>
    </div>                      
    <div className="row">
    <img className="col-md-2" alt={book.id} src={book.volumeInfo.imageLinks.smallThumbnail} >
    </img>
    <p className="col-md-10">
    {book.volumeInfo.description}
    </p>
    </div>

    <DeleteBtn onClick={() => this.deleteBook(book)} />
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
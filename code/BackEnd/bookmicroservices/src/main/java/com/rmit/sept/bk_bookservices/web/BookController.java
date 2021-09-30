package com.rmit.sept.bk_bookservices.web;


import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.payload.ImgUploadUrlRequest;
import com.rmit.sept.bk_bookservices.payload.GetBookRequest;
import com.rmit.sept.bk_bookservices.payload.ImgUploadUrlResponse;
import com.rmit.sept.bk_bookservices.payload.SearchRequest;
import com.rmit.sept.bk_bookservices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;


    @PostMapping("/addbook")
    public ResponseEntity<?> addBook(@Valid @RequestBody Book book, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Book newBook = bookService.saveBook(book);

        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    @PostMapping("/populateData")
    public ResponseEntity<?> populateData() {

        if (!bookRepository.findAll().isEmpty())
        {
            return new ResponseEntity<String>("Already populated with data", HttpStatus.CREATED);
        }


        Book book1 = new Book();
        book1.setIsbn("1234567890");
        book1.setTitle("The Very Hungry Caterpillar");
        book1.setAuthor("Eric Carle");
        book1.setGenre("kids-teens");
        book1.setImgURL("https://images-na.ssl-images-amazon.com/images/I/51aQj3i-EmL._SY351_BO1,204,203,200_.jpg");
        book1.setDescription("The Very Hungry Caterpillar is a children's picture book designed, illustrated, and written by Eric Carle, first published by the World Publishing Company in 1969, later published by Penguin Putnam.");
        book1.setPrice("10");

        Book book2 = new Book();
        book2.setIsbn("1234567891");
        book2.setTitle("Harry Potter and the Philosopher's Stone");
        book2.setAuthor("J.K Rowling");
        book2.setGenre("fiction");
        book2.setImgURL("https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/09/29/15/hp.jpg?width=982&height=726&auto=webp&quality=75");
        book2.setDescription("Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.");
        book2.setPrice("15");

        Book book3 = new Book();
        book3.setIsbn("1234567892");
        book3.setTitle("Hunter X Hunter");
        book3.setAuthor("Yoshihiro Togashi");
        book3.setGenre("fiction");
        book3.setImgURL("https://media.comicbook.com/2017/09/hunter-x-hunter-1019647-1022756.jpg?auto=webp&width=1200&height=675&crop=1200:675,smart");
        book3.setDescription("The story focuses on a young boy named Gon Freecss who discovers that his father, who left him at a young age, is actually a world-renowned Hunter, a licensed professional who specializes in fantastical pursuits.");
        book3.setPrice("14.99");

        bookService.saveBook(book1);
        bookService.saveBook(book2);
        bookService.saveBook(book3);

        return new ResponseEntity<String>("Populated", HttpStatus.CREATED);
    }


    @PostMapping("/getbook")
    public ResponseEntity<?> getBook(@Valid @RequestBody GetBookRequest getBookRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Book book = bookService.getBook(getBookRequest.getId());

        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }


    @PostMapping("/getimguploadurl")
    public ResponseEntity<?> getImgUploadUrl(@Valid @RequestBody ImgUploadUrlRequest imgUploadUrlRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Book book = bookService.getBook(imgUploadUrlRequest.getBookId());

        String url = "http://localhost:8089/api/upload/" + book.getId();
        return ResponseEntity.ok(new ImgUploadUrlResponse(url));
    }


    @PostMapping("/searchbooks")
    public ResponseEntity<?> searchForBooks(@Valid @RequestBody SearchRequest searchRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return bookService.getSearchResults(searchRequest.getSearchTerm());
    }


    @PostMapping("/booksbygenre")
    public ResponseEntity<?> getBooksByGenre(@Valid @RequestBody SearchRequest genreRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return bookService.getBooksByGenre(genreRequest.getSearchTerm());
    }


    @GetMapping("/getallbooks")
    public ResponseEntity<?> getAllBooks() {
        return bookService.getAllBooks();
    }
}
package com.rmit.sept.bk_bookservices.web;


import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.payload.ImgUploadUrlRequest;
import com.rmit.sept.bk_bookservices.payload.GetBookRequest;
import com.rmit.sept.bk_bookservices.payload.ImgUploadUrlResponse;
import com.rmit.sept.bk_bookservices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookService bookService;


    @PostMapping("/addbook")
    public ResponseEntity<?> addBook(@Valid @RequestBody Book book, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        Book newBook = bookService.saveBook(book);

        return  new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }


    @PostMapping("/getbook")
    public ResponseEntity<?> getBook(@Valid @RequestBody GetBookRequest getBookRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Book book = bookService.getBook(getBookRequest.getId());

        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }


    @PostMapping("/getimguploadurl")
    public ResponseEntity<?> getImgUploadUrl(@Valid @RequestBody ImgUploadUrlRequest imgUploadUrlRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Book book = bookService.getBook(imgUploadUrlRequest.getBookId());

        String url = "http://localhost:8080/api/upload/" + book.getId();
        return ResponseEntity.ok(new ImgUploadUrlResponse(url));
    }

}

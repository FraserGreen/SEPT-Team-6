package com.rmit.sept.bk_bookservices.services;


import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.exceptions.BookNotFoundException;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;


    public Book saveBook(Book newBook){
        return bookRepository.save(newBook);
    }

    public Book getBook (Long id) {
        Book book = bookRepository.getById(id);
        if (book == null) new BookNotFoundException("Book with id " + id + " not found");
        return book;
    }

}

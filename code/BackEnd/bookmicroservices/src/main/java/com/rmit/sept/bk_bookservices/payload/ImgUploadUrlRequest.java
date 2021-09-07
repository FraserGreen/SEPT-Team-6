package com.rmit.sept.bk_bookservices.payload;

import javax.validation.constraints.NotBlank;

public class ImgUploadUrlRequest {

    @NotBlank(message = "bookId cannot be blank")
    private String bookId;
    @NotBlank(message = "contentType cannot be blank")
    private String contentType;

    public String getBookId() { return bookId; }

    public void setBookId(String bookId) { this.bookId = bookId; }

    public String getContentType() { return contentType; }

    public void setContentType(String contentType) { this.contentType = contentType; }
}
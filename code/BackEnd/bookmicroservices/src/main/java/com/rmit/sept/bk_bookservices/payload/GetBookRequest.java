package com.rmit.sept.bk_bookservices.payload;

import javax.validation.constraints.NotBlank;

public class GetBookRequest {

    @NotBlank(message = "ID cannot be blank")
    private Long id;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }
}
package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.model.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class msloginTests {

    // there are 2 many fukn tests
    @BeforeAll
    static void initDatabase(){
        // Maybe put guys into database?
    }

    @Test
    void test_admin_user(){
        // Get user from database?
        User user = new User();

        // Check the user is right
//        assertAll("user",
//                () -> assertEquals("", user.getUsername()),
//                () -> assertEquals("", user.getPassword()),
//                () -> assertEquals("", user.getFirstName()),
//                () -> assertEquals("", user.getLastName()),
//                () -> assertEquals("", user.getAddress()),
//                () -> assertEquals("", user.getPhone()),
//                () -> assertNull( user.getAbn()),
//                () -> assertNull( user.getBusinessName())
//        );
        assertAll("user",
                () -> assertNull( user.getAbn()),
                () -> assertNull( user.getBusinessName())
        );
    }

    @Test
    void test_normal_user(){
        // Copy test admin user when its working
    }

    @Test
    void test_business_user(){
        // Copy test admin user when its working
    }

    @Test
    void test_validation(){

    }

    @Test
    void contextLoads() {
    }

}

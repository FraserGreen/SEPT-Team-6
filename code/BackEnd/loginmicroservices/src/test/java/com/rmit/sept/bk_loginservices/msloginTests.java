package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class msloginTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    void test_admin_user(){
        User testUser = new User();
        testUser.setUsername("Bob@gmail.com");
        testUser.setPassword("qwerty");
        testUser.setFirstName("Bob");
        testUser.setLastName("Ross");
        testUser.setAddress("abcderf");
        testUser.setPhone("93142052");
        testUser.setUserType(UserType.ADMIN);

        userRepository.save(testUser);

        User user = userRepository.findByUsername("Bob@gmail.com");

        // Check the user is right
        assertAll("user",
                () -> assertEquals("Bob@gmail.com", user.getUsername()),
                () -> assertEquals("Bob", user.getFirstName()),
                () -> assertEquals("Ross", user.getLastName()),
                () -> assertEquals("abcderf", user.getAddress()),
                () -> assertEquals("93142052", user.getPhone()),
                () -> assertEquals(UserType.ADMIN, user.getUserType()),
                () -> assertNull( user.getAbn()),
                () -> assertNull( user.getBusinessName())
        );
    }

    @Test
    void test_business_user() {
        User testUser = new User();
        testUser.setUsername("Bob2@gmail.com");
        testUser.setPassword("qwerty");
        testUser.setFirstName("Bob");
        testUser.setLastName("Ross");
        testUser.setAddress("abcderf");
        testUser.setPhone("93142052");
        testUser.setBusinessName("Bobs bookshop");
        testUser.setAbn("123423-32");
        testUser.setUserType(UserType.BUSINESS);

        userRepository.save(testUser);

        User user = userRepository.findByUsername("Bob2@gmail.com");

        // Check the user is right
        assertAll("user",
                () -> assertEquals("Bob2@gmail.com", user.getUsername()),
                () -> assertEquals("Bob", user.getFirstName()),
                () -> assertEquals("Ross", user.getLastName()),
                () -> assertEquals("abcderf", user.getAddress()),
                () -> assertEquals("93142052", user.getPhone()),
                () -> assertEquals(UserType.BUSINESS, user.getUserType()),
                () -> assertEquals("123423-32", user.getAbn()),
                () -> assertEquals("Bobs bookshop", user.getBusinessName())
        );
    }

    @Test
    void test_user(){
        User testUser = new User();
        testUser.setUsername("Bob3@gmail.com");
        testUser.setPassword("qwerty");
        testUser.setFirstName("Bob");
        testUser.setLastName("Ross");
        testUser.setAddress("abcderf");
        testUser.setPhone("93142052");
        testUser.setUserType(UserType.USER);

        userRepository.save(testUser);

        User user = userRepository.findByUsername("Bob3@gmail.com");

        // Check the user is right
        assertAll("user",
                () -> assertEquals("Bob3@gmail.com", user.getUsername()),
                () -> assertEquals("Bob", user.getFirstName()),
                () -> assertEquals("Ross", user.getLastName()),
                () -> assertEquals("abcderf", user.getAddress()),
                () -> assertEquals("93142052", user.getPhone()),
                () -> assertEquals(UserType.USER, user.getUserType()),
                () -> assertNull( user.getAbn()),
                () -> assertNull( user.getBusinessName())
        );
    }
}

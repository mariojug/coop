package com.mariojug.coop;

import com.mariojug.coop.account.AccountController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = AccountController.class)
public class AccountControllerTests {

    @Autowired
    private MockMvc mockMvc;

    private final static Pattern UUID_REGEX_PATTERN = Pattern.compile("[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}");

    private static boolean isValidUUID(String str) {
        if (str == null) {
            return false;
        }
        return UUID_REGEX_PATTERN.matcher(str).matches();
    }


    @Test
    public void createAccount1() throws Exception {
        System.out.println("Testing AccountController.createAccount()...");
        String exampleJson = "{\"firstName\":\"test\",\"lastName\":\"test\",\"email\":\"test\",\"username\":\"test\"}";


        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/api/v1/account")
                .accept(MediaType.APPLICATION_JSON)
                .content(exampleJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        String uuid = response.getContentAsString();

        assertTrue(isValidUUID(uuid));

        // cleanup
        requestBuilder = MockMvcRequestBuilders
                .delete("/api/v1/account")
                .queryParam("id", uuid)
                .queryParam("email", "test");

        result = mockMvc.perform(requestBuilder).andReturn();

    }
}

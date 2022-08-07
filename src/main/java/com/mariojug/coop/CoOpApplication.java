package com.mariojug.coop;

import com.mariojug.coop.account.Account;
import com.mariojug.coop.account.AccountController;
import com.mariojug.coop.account.AccountService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;

@SpringBootApplication
public class CoOpApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoOpApplication.class, args);
	}



}

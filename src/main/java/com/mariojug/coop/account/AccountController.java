package com.mariojug.coop.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(path="api/v1/account")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public Account getAccount(@RequestParam String id, @RequestParam String email) {
        return this.accountService.getAccount(id, email);
    }

    @PutMapping
    public String createAccount(@RequestParam NewAccount newAccount) {
        Account account = Account.newAccount(newAccount);
        this.accountService.createUpdateAccount(account);
        return account.getId();
    }

    @PostMapping
    public boolean updateAccount(@RequestParam Account account){
        this.accountService.createUpdateAccount(account);
        return true;
    }

    @DeleteMapping
    public boolean deleteAccount(@RequestParam String id, @RequestParam String email) {
        this.accountService.deleteAccount(id, email);
        return true;
    }
}

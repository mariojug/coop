package com.mariojug.coop.account;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;
import java.util.UUID;


@DynamoDBTable(tableName="Accounts")
public class Account {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;

    public Account (String id, String firstName, String lastName, String username, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
    }

    public Account (String firstName, String lastName, String username, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;

        this.id = getUUID();

    }

    public Account () {}

    public static Account newAccount(NewAccount account) {
        return new Account(account.getFirstName(), account.getLastName(), account.getUsername(), account.getEmail());
    }


    private String getUUID() {
        // create the uuid
        LocalDate now = LocalDate.now();
        Random rd = new Random();
        float randomFloat = rd.nextFloat();
        byte[] newByteArray = (this.toString() + now + randomFloat).getBytes();
        UUID uuid = UUID.nameUUIDFromBytes(newByteArray);

        return uuid.toString();

    }

    @DynamoDBHashKey(attributeName="id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName="firstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @DynamoDBAttribute(attributeName="lastName")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @DynamoDBAttribute(attributeName = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @DynamoDBRangeKey(attributeName="email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

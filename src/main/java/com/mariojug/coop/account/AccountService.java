package com.mariojug.coop.account;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.AmazonDynamoDBException;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import java.util.HashMap;


@Service
public class AccountService {
    private final String tableName = "Accounts";
    private final AmazonDynamoDB client;
    private final DynamoDBMapper mapper;

    public AccountService() {
        this.client = AmazonDynamoDBClientBuilder.standard().withRegion("us-east-1").build();
        this.mapper = new DynamoDBMapper(this.client);
    }

    public void createUpdateAccount(Account account) {
        try {
        mapper.save(account);
        } catch (AmazonDynamoDBException e) {
            e.getStackTrace();
        }
    }

    public Account getAccount(String id, String email) {
        try {
            return mapper.load(Account.class, id, email);
        } catch (AmazonDynamoDBException e) {
            e.getStackTrace();
            return null;
        }
    }

    public void deleteAccount(String id, String email) {
        try {
            HashMap<String, AttributeValue> key = new HashMap<String, AttributeValue>();

            key.put("id", new AttributeValue(id));
            key.put("email", new AttributeValue(email));

            client.deleteItem(tableName, key);
        } catch (AmazonServiceException e) {
            e.getErrorMessage();
        }
    }
}

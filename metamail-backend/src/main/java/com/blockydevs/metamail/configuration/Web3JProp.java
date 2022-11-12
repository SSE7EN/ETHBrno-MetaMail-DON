package com.blockydevs.metamail.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.math.BigInteger;

@ConfigurationProperties(prefix = "web3j")
public record Web3JProp(
        String privateKey,
        String contractAddress
){
    public static BigInteger GAS_PRICE = BigInteger.valueOf(500000);
    public static BigInteger GAS_LIMIT = BigInteger.valueOf(500000);

}

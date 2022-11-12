package com.blockydevs.metamail.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "web3j")
public record Web3JProp(
        String privateKey,
        String contractAddress
){

}

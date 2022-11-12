package com.blockydevs.metamail.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Configuration
@RequiredArgsConstructor
public class Web3JConfig {
    private final Web3JProp web3JProp;

    @Bean
    public Web3j getWeb3j(){
        return Web3j.build(new HttpService(
                "https://goerli.infura.io/v3/93314a51bef34f7bafe47b87be241a27"));
    }

    @Bean
    public Credentials getCredentials(){
        return Credentials.create(web3JProp.privateKey());
    }
}

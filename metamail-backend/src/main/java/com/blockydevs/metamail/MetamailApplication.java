package com.blockydevs.metamail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class MetamailApplication {

	public static void main(String[] args) {
		SpringApplication.run(MetamailApplication.class, args);
	}

}

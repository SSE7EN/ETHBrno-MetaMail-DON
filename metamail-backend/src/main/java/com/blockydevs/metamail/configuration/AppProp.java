package com.blockydevs.metamail.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProp(
        String registrationRedirectUri
) {
}

package com.blockydevs.metamail.domain;

import lombok.Builder;

public record RegisterResponse(
        boolean status,
        String transactionHash
) {
    @Builder public RegisterResponse{}
}

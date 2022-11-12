package com.blockydevs.metamail.domain;

import lombok.Builder;

public record MailMapRegisterResponse(
        boolean status,
        String transactionHash
) {
    @Builder public MailMapRegisterResponse{}
}

package com.blockydevs.metamail.evm.command;

import lombok.Builder;

public record RegisterEmailHandlerCommand(
        String sig,
        String emailHash
) {
    @Builder public RegisterEmailHandlerCommand {}
}

package com.blockydevs.metamail.business.command;

import lombok.Builder;

public record RegisterEmailCommand(
        String sig,
        String email
) {
    @Builder public RegisterEmailCommand{}
}

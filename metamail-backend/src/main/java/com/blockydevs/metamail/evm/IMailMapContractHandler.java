package com.blockydevs.metamail.evm;

import com.blockydevs.metamail.domain.MailMapRegisterResponse;
import com.blockydevs.metamail.evm.command.RegisterEmailHandlerCommand;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public interface IMailMapContractHandler {
    MailMapRegisterResponse registerEmail(RegisterEmailHandlerCommand command) throws IOException;
}

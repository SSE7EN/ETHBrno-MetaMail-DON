package com.blockydevs.metamail.evm;

import com.blockydevs.metamail.evm.command.RegisterEmailHandlerCommand;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public interface IMailMapContractHandler {
    boolean registerEmail(RegisterEmailHandlerCommand command) throws ExecutionException, InterruptedException, IOException;
}

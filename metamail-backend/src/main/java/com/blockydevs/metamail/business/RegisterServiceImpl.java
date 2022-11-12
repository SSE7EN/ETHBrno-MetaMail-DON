package com.blockydevs.metamail.business;

import com.blockydevs.metamail.business.command.RegisterEmailCommand;
import com.blockydevs.metamail.evm.IMailMapContractHandler;
import com.blockydevs.metamail.evm.command.RegisterEmailHandlerCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Hash;
import org.web3j.protocol.Web3j;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements IRegisterService {
    private final IMailMapContractHandler mailMapContractHandler;
    @Override
    public void register(final RegisterEmailCommand command) {

        try {
            mailMapContractHandler.registerEmail(RegisterEmailHandlerCommand.builder()
                    .sig(command.sig())
                    .emailHash(Hash.sha3String("bartosz.solka@gmail.com"))
                    .build());
        } catch (ExecutionException | InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }

    }
}

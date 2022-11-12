package com.blockydevs.metamail.business;

import com.blockydevs.metamail.business.command.RegisterEmailCommand;
import com.blockydevs.metamail.domain.RegisterResponse;
import com.blockydevs.metamail.evm.IMailMapContractHandler;
import com.blockydevs.metamail.evm.command.RegisterEmailHandlerCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Hash;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements IRegisterService {
    private final IMailMapContractHandler mailMapContractHandler;
    @Override
    public RegisterResponse register(final RegisterEmailCommand command) {

        try {
            final var response = mailMapContractHandler.registerEmail(RegisterEmailHandlerCommand.builder()
                    .sig(command.sig())
                    .emailHash(Hash.sha3String(command.email()))
                    .build());
            return RegisterResponse.builder()
                    .status(response.status())
                    .transactionHash(response.transactionHash())
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}

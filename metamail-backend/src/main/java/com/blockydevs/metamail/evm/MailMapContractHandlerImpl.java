package com.blockydevs.metamail.evm;

import com.blockydevs.metamail.domain.MailMapRegisterResponse;
import com.blockydevs.metamail.evm.command.RegisterEmailHandlerCommand;
import com.blockydevs.metamail.util.Web3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.RawTransactionManager;
import org.web3j.utils.Numeric;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static com.blockydevs.metamail.configuration.Web3JProp.GAS_LIMIT;
import static com.blockydevs.metamail.configuration.Web3JProp.GAS_PRICE;

@Service
@RequiredArgsConstructor
public class MailMapContractHandlerImpl implements IMailMapContractHandler {
    private final Web3j web3j;
    private final Credentials credentials;
    @Override
    public MailMapRegisterResponse registerEmail(final RegisterEmailHandlerCommand command) throws IOException {
        final var sigParts = Web3Util.convertSignature(command.sig());
        final var sigS = sigParts.get("s");
        final var sigR = sigParts.get("r");
        final var sigV = sigParts.get("v");
        final var registerEmail = new Function(
                "registerEmail",  // function we're calling
                Arrays.asList(
                        new Bytes32(Numeric.hexStringToByteArray(command.emailHash())),
                        new Uint8(Long.decode(sigV)),
                        new Bytes32(Numeric.hexStringToByteArray(sigR)),
                        new Bytes32(Numeric.hexStringToByteArray(sigS))
                ), List.of());

        final var encodedFunction = FunctionEncoder.encode(registerEmail);


        final var txManager = new RawTransactionManager(web3j, credentials);

        // Send transaction
        final var ethSendTransaction = txManager.sendTransaction(
                GAS_PRICE,
                GAS_LIMIT,
                credentials.getAddress(),
                encodedFunction,
                BigInteger.ZERO);

        if(ethSendTransaction.hasError()) {
            throw new RuntimeException(ethSendTransaction.getError()
                    .getMessage());
        }

        return MailMapRegisterResponse.builder()
                .status(true)
                .transactionHash(ethSendTransaction.getTransactionHash())
                .build();
    }
}

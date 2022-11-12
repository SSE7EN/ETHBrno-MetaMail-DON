package com.blockydevs.metamail.evm;

import com.blockydevs.metamail.configuration.Web3JProp;
import com.blockydevs.metamail.evm.command.RegisterEmailHandlerCommand;
import com.blockydevs.metamail.util.Web3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.utils.Numeric;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class MailMapContractHandlerImpl implements IMailMapContractHandler {
    private final Web3j web3j;
    private final Credentials credentials;
    private final Web3JProp web3JProp;
    @Override
    public boolean registerEmail(final RegisterEmailHandlerCommand command) throws IOException {
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
        String txHash = txManager.sendTransaction(
                BigInteger.valueOf(500000),
                BigInteger.valueOf(500000),
                credentials.getAddress(),
                encodedFunction,
                BigInteger.ZERO).getTransactionHash();
        return false;
    }
}

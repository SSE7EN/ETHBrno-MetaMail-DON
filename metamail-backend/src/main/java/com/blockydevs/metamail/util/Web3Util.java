package com.blockydevs.metamail.util;

import java.util.Map;

public class Web3Util {
    static public Map<String, String> convertSignature(final String sig){
        final var signature = removeStarting0x(sig);

        return Map.of(
              "s", "0x"+signature.substring(0, 64),
                "r", "0x"+signature.substring(64, 128),
                "v", "0x"+signature.substring(128, 130)
        );
    }

    static private String removeStarting0x(final String sig){
        if(sig.startsWith("0x")){
            return sig.replaceFirst("0x", "");
        }
        return sig;
    }
}

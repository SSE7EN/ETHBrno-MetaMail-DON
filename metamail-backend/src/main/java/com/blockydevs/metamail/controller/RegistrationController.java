package com.blockydevs.metamail.controller;

import com.blockydevs.metamail.business.IRegisterService;
import com.blockydevs.metamail.business.command.RegisterEmailCommand;
import com.blockydevs.metamail.configuration.AppProp;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {
    private final IRegisterService registerService;
    private final AppProp appProp;

    @GetMapping("/{sig}")
    @CrossOrigin
    public void register(@NotNull @PathVariable("sig") final String sig,
                         final Principal principal,
                         HttpServletResponse httpServletResponse) throws IOException {
        final var response = registerService.register(RegisterEmailCommand.builder()
                .email(((OAuth2AuthenticationToken) principal).getPrincipal().getAttribute("email"))
                .sig(sig)
                .build());

        httpServletResponse.sendRedirect(String.format("%s/tx=%s", appProp.registrationRedirectUri(),
                response.transactionHash()));

    }

}

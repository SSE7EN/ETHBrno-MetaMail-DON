package com.blockydevs.metamail.business;

import com.blockydevs.metamail.business.command.RegisterEmailCommand;
import com.blockydevs.metamail.domain.RegisterResponse;

public interface IRegisterService {
    RegisterResponse register(RegisterEmailCommand command);
}

package com.blockydevs.metamail.business;

import com.blockydevs.metamail.business.command.RegisterEmailCommand;

public interface IRegisterService {
    void register(RegisterEmailCommand command);
}

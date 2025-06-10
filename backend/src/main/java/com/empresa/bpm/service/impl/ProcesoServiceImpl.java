package main.java.com.empresa.bpm.service.impl;

import com.empresa.bpm.service.ProcesoService;
import org.camunda.bpm.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProcesoServiceImpl implements ProcesoService {

    @Autowired
    private RuntimeService runtimeService;

    @Override
    public String iniciarProceso(String keyProceso, Map<String, Object> variables) {
        return runtimeService.startProcessInstanceByKey(keyProceso, variables).getId();
    }
}

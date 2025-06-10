package main.java.com.empresa.bpm.service;

import java.util.Map;

public interface ProcesoService {
    String iniciarProceso(String keyProceso, Map<String, Object> variables);
}

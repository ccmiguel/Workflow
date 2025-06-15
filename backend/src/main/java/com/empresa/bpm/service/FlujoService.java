package com.empresa.bpm.service;

import com.empresa.bpm.model.FlujoPaso;
import com.empresa.bpm.repository.FlujoPasoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlujoService {

    private final FlujoPasoRepository flujoPasoRepository;

    @Autowired
    public FlujoService(FlujoPasoRepository flujoPasoRepository) {
        this.flujoPasoRepository = flujoPasoRepository;
    }

    public FlujoPaso obtenerPaso(String flujo, String proceso) {
        return flujoPasoRepository.findByFlujoAndProceso(flujo, proceso).orElse(null);
    }

    public List<FlujoPaso> obtenerPasosPorFlujo(String flujo) {
        return flujoPasoRepository.findAll().stream()
                .filter(p -> p.getFlujo().equalsIgnoreCase(flujo))
                .toList();
    }

    public FlujoPaso agregarPaso(FlujoPaso paso) {
        return flujoPasoRepository.save(paso);
    }

    public void eliminarPasoPorId(Long id) {
        flujoPasoRepository.deleteById(id);
    }

    public List<FlujoPaso> obtenerPasosPorRol(String rol) {
        return flujoPasoRepository.findByRolIgnoreCase(rol);
    }

    public List<FlujoPaso> obtenerTodosLosPasos() {
        return flujoPasoRepository.findAll();
    }

    public String obtenerProcesoAnterior(String flujo, String procesoActual) {
        return flujoPasoRepository.findProcesoByFlujoAndSiguiente(flujo, procesoActual);
    }

    public List<FlujoPaso> obtenerPasosPorRolYFlujo(String rol, String flujo) {
        return flujoPasoRepository.findByRolAndFlujo(rol, flujo);
    }

    public List<FlujoPaso> obtenerTodosLosPasosPorFlujo(String flujo) {
        return flujoPasoRepository.findByFlujo(flujo);
    }



}

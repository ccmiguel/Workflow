package com.empresa.bpm.controller;

import com.empresa.bpm.model.FlujoPaso;
import com.empresa.bpm.service.FlujoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flujo")
@CrossOrigin(origins = "http://localhost:5173")
public class FlujoController {

    @Autowired
    private FlujoService flujoService;

    // 🔍 Obtener un paso específico
    @GetMapping("/paso/{flujo}/{proceso}")
    public ResponseEntity<FlujoPaso> obtenerPaso(@PathVariable String flujo, @PathVariable String proceso) {
        FlujoPaso paso = flujoService.obtenerPaso(flujo, proceso);
        if (paso == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(paso);
    }

    // 📄 Obtener todos los pasos de un flujo
    @GetMapping("/pasos/{flujo}")
    public List<FlujoPaso> obtenerPasosPorFlujo(@PathVariable String flujo) {
        return flujoService.obtenerPasosPorFlujo(flujo);
    }

    // ➕ Agregar nuevo paso
    @PostMapping("/paso")
    public ResponseEntity<FlujoPaso> agregarPaso(@RequestBody FlujoPaso paso) {
        FlujoPaso nuevoPaso = flujoService.agregarPaso(paso);
        return ResponseEntity.ok(nuevoPaso);
    }

    // ❌ Eliminar paso por ID
    @DeleteMapping("/paso/{id}")
    public ResponseEntity<Void> eliminarPaso(@PathVariable Long id) {
        flujoService.eliminarPasoPorId(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Obtener pasos por rol (usuario)
//    @GetMapping("/usuario/{rol}")
//    public List<FlujoPaso> obtenerPorRol(@PathVariable String rol) {
//        return flujoService.obtenerPasosPorRol(rol);
//    }

    // 📋 Obtener todos los pasos sin filtrar
//    @GetMapping("/todos")
//    public List<FlujoPaso> obtenerTodosLosPasos() {
//        return flujoService.obtenerTodosLosPasos();
//    }

    // 🔙 Obtener el proceso anterior en el flujo
    @GetMapping("/anterior/{flujo}/{proceso}")
    public ResponseEntity<?> obtenerProcesoAnterior(@PathVariable String flujo, @PathVariable String proceso) {
        String anterior = flujoService.obtenerProcesoAnterior(flujo, proceso);
        if (anterior == null) {
            return ResponseEntity.ok().body(new java.util.HashMap<>()); // respuesta vacía
        }
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("anterior", anterior);
        return ResponseEntity.ok(response);
    }

    // ✅ Obtener pasos por rol (usuario), con filtro opcional por flujo
    @GetMapping("/usuario/{rol}")
    public List<FlujoPaso> obtenerPorRol(
            @PathVariable String rol,
            @RequestParam(required = false) String flujo
    ) {
        if (flujo != null && !flujo.isEmpty()) {
            return flujoService.obtenerPasosPorRolYFlujo(rol, flujo);
        } else {
            return flujoService.obtenerPasosPorRol(rol);
        }
    }

    // ✅ Obtener todos los pasos, con filtro opcional por flujo
    @GetMapping("/todos")
    public List<FlujoPaso> obtenerTodosLosPasos(
            @RequestParam(required = false) String flujo
    ) {
        if (flujo != null && !flujo.isEmpty()) {
            return flujoService.obtenerTodosLosPasosPorFlujo(flujo);
        } else {
            return flujoService.obtenerTodosLosPasos();
        }
    }






}

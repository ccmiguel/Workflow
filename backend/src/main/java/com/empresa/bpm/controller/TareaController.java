package com.empresa.bpm.controller;

import com.empresa.bpm.model.SolicitudPermisosDTO;
import com.empresa.bpm.model.SolicitudVacacionesDTO;
import jakarta.validation.Valid;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private com.empresa.bpm.service.ProcesoService procesoService;

    @GetMapping("/{usuario}")
    public List<Map<String, Object>> obtenerTareas(@PathVariable String usuario) {
//        List<Task> tareas = taskService.createTaskQuery().taskAssignee(usuario).list();

        // Aquí puedes simular los roles
        List<Task> tareas;

        if (usuario.equalsIgnoreCase("rrhh")) {
            // RRHH puede ver tareas asignadas a RRHH
            tareas = taskService.createTaskQuery().taskAssignee("rrhh").list();
        } else if (usuario.equalsIgnoreCase("jefe")) {
            // Jefe ve sus tareas
            tareas = taskService.createTaskQuery().taskAssignee("jefe").list();
        } else {
            // Por defecto, ver solo tareas asignadas a ese usuario
            tareas = taskService.createTaskQuery().taskAssignee(usuario).list();
        }

        // Convertir las tareas a un formato más amigable para la respuesta
        List<Map<String, Object>> respuesta = new ArrayList<>();
        for (Task t : tareas) {
            Map<String, Object> tarea = new HashMap<>();
            tarea.put("id", t.getId());
            tarea.put("nombre", t.getName());
            tarea.put("proceso", t.getProcessDefinitionId());
            respuesta.add(tarea);
        }

        return respuesta;
    }

    @PostMapping("/{id}/completar")
    public ResponseEntity<?> completarTarea(@PathVariable String id, @RequestBody Map<String, Object> variables) {
        if (!variables.containsKey("aprobado")) {
            return ResponseEntity.badRequest().body("La variable 'aprobado' es requerida.");
        }

        Map<String, Object> vars = new HashMap<>();
        variables.forEach((k, v) -> vars.put(k, Variables.stringValue(v.toString())));

        try {
            taskService.complete(id, vars);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al completar tarea: " + e.getMessage());
        }
    }

//    @PostMapping("/iniciar")
//    public String iniciarProceso(@Valid @RequestBody SolicitudVacacionesDTO dto) {
//        Map<String, Object> variables = new HashMap<>();
//        variables.put("empleado", dto.getCiEmpleado());
//        variables.put("fechaInicio", dto.getFechaInicio().toString());
//        variables.put("fechaFin", dto.getFechaFin().toString());
//        variables.put("motivo", dto.getMotivo());
//        variables.put("usuarioAsignado", dto.getUsuarioAsignado());
//
//        return procesoService.iniciarProceso("solicitud_vacaciones", variables);
//    }

//    @PostMapping("/iniciar/{proceso}")
//    public String iniciarProceso(
//        @PathVariable String proceso,
//        @Valid @RequestBody SolicitudVacacionesDTO dto) {
//
//        Map<String, Object> variables = new HashMap<>();
//        variables.put("ciEmpleado", dto.getCiEmpleado());
//        variables.put("fechaInicio", dto.getFechaInicio());
//        variables.put("fechaFin", dto.getFechaFin());
//        variables.put("motivo", dto.getMotivo());
//        variables.put("usuarioAsignado", dto.getUsuarioAsignado());
//
//        return procesoService.iniciarProceso(proceso, variables);
//    }

    @PostMapping("/iniciar/solicitud-vacaciones")
    public String iniciarVacaciones(@Valid @RequestBody SolicitudVacacionesDTO dto) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("ciEmpleado", dto.getCiEmpleado());
        variables.put("fechaInicio", dto.getFechaInicio());
        variables.put("fechaFin", dto.getFechaFin());
        variables.put("motivo", dto.getMotivo());
        variables.put("usuarioAsignado", dto.getUsuarioAsignado());

        return procesoService.iniciarProceso("solicitud_vacaciones", variables);
    }


    @PostMapping("/iniciar/solicitud-permisos")
    public String iniciarPermiso(@Valid @RequestBody SolicitudPermisosDTO dto) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("ciEmpleado", dto.getCiEmpleado());
        variables.put("fecha", dto.getFecha());
        variables.put("tipoPermiso", dto.getTipoPermiso());
        variables.put("horas", dto.getHoras());
        variables.put("justificacion", dto.getJustificacion());
        variables.put("usuarioAsignado", dto.getUsuarioAsignado());

        return procesoService.iniciarProceso("solicitud_permisos", variables);
    }



}

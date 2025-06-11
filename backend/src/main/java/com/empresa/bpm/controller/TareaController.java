package com.empresa.bpm.controller;

import com.empresa.bpm.model.SolicitudVacacionesDTO;
import jakarta.validation.Valid;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void completarTarea(@PathVariable String id, @RequestBody Map<String, Object> variables) {
        Map<String, Object> vars = new HashMap<>();
        variables.forEach((k, v) -> vars.put(k, Variables.stringValue(v.toString())));
        taskService.complete(id, vars);
    }

    @PostMapping("/iniciar")
    public String iniciarProceso(@Valid @RequestBody SolicitudVacacionesDTO dto) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("empleado", dto.getCiEmpleado());
        variables.put("fechaInicio", dto.getFechaInicio().toString());
        variables.put("fechaFin", dto.getFechaFin().toString());
        variables.put("motivo", dto.getMotivo());

        return procesoService.iniciarProceso("solicitud_vacaciones", variables);
    }
}

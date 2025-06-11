package com.empresa.bpm.controller;

import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private com.empresa.bpm.service.ProcesoService procesoService;

    @GetMapping("/{usuario}")
    public List<Map<String, Object>> obtenerTareas(@PathVariable String usuario) {
        List<Task> tareas = taskService.createTaskQuery().taskAssignee(usuario).list();

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
    public String iniciarProceso(@RequestBody Map<String, Object> variables) {
        return procesoService.iniciarProceso("solicitud_vacaciones", variables);
    }
}

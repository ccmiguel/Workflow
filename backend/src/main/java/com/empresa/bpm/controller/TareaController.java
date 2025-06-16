package com.empresa.bpm.controller;

import com.empresa.bpm.model.FlujoSeguimiento;
import com.empresa.bpm.model.SolicitudPermisosDTO;
import com.empresa.bpm.model.SolicitudVacacionesDTO;
import com.empresa.bpm.repository.FlujoSeguimientoRepository;
import jakarta.validation.Valid;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private FlujoSeguimientoRepository seguimientoRepository;

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

    @Autowired
    private org.camunda.bpm.engine.RuntimeService runtimeService;

    @GetMapping("/detalles/{id}")
    public Map<String, Object> obtenerVariablesDeTarea(@PathVariable String id) {
        Task tarea = taskService.createTaskQuery().taskId(id).singleResult();
        if (tarea == null) {
            throw new RuntimeException("Tarea no encontrada");
        }

        // Obtener variables locales y globales (según cómo se guarden)
//        Map<String, Object> variables = taskService.getVariables(tarea.getId());
        Map<String, Object> variables = runtimeService.getVariables(tarea.getExecutionId());

        // Puedes añadir el nombre o el proceso si deseas
        variables.put("nombreTarea", tarea.getName());
        variables.put("proceso", tarea.getProcessDefinitionId());

        return variables;
    }


//    @PostMapping("/{id}/completar")
//    public ResponseEntity<?> completarTarea(@PathVariable String id, @RequestBody Map<String, Object> variables) {
//        if (!variables.containsKey("aprobado")) {
//            return ResponseEntity.badRequest().body("La variable 'aprobado' es requerida.");
//        }
//
//        Map<String, Object> vars = new HashMap<>();
//        variables.forEach((k, v) -> vars.put(k, Variables.stringValue(v.toString())));
//
//        try {
//            taskService.complete(id, vars);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al completar tarea: " + e.getMessage());
//        }
//    }

    @PostMapping("/{id}/completar")
    public ResponseEntity<?> completarTarea(@PathVariable String id, @RequestBody Map<String, Object> variables) {
        if (!variables.containsKey("aprobado")) {
            return ResponseEntity.badRequest().body("La variable 'aprobado' es requerida.");
        }

        Task tarea = taskService.createTaskQuery().taskId(id).singleResult();
        Map<String, Object> existentes = runtimeService.getVariables(tarea.getExecutionId());

        variables.forEach((k, v) -> existentes.put(k, v));

        // Recuperar datos necesarios
        Object nroObj = existentes.get("nrotramite");
        System.out.println("Variables existentes: " + existentes);

        int nroTramite = 0;

        if (nroObj instanceof Integer) {
            nroTramite = (Integer) nroObj;
        } else if (nroObj instanceof String) {
            try {
                nroTramite = Integer.parseInt((String) nroObj);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("nrotramite inválido.");
            }
        } else if (nroObj instanceof Long) {
            nroTramite = ((Long) nroObj).intValue();
        } else {
            return ResponseEntity.badRequest().body("nrotramite no definido o con tipo inesperado.");
        }
        String flujo = tarea.getProcessDefinitionId(); // o "F1" si lo defines fijo
        String proceso = tarea.getTaskDefinitionKey(); // o "P3", dependiendo de cómo lo definas
        String usuario = tarea.getAssignee(); // quién la está completando
        LocalDateTime fechaInicio = LocalDateTime.now().minusMinutes(5); // Simulado
        LocalDateTime fechaFin = LocalDateTime.now();

// Guardar en BD
        FlujoSeguimiento seguimiento = new FlujoSeguimiento();
        seguimiento.setNrotramite(nroTramite);
        seguimiento.setFlujo(flujo);
        seguimiento.setProceso(proceso);
        seguimiento.setUsuario(usuario);
        seguimiento.setFechaInicio(fechaInicio);
        seguimiento.setFechaFin(fechaFin);
        seguimientoRepository.save(seguimiento);
        try {
            taskService.complete(id, existentes);
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

//    @PostMapping("/iniciar/solicitud-vacaciones")
//    public String iniciarVacaciones(@Valid @RequestBody SolicitudVacacionesDTO dto) {
//        Map<String, Object> variables = new HashMap<>();
//        variables.put("ciEmpleado", dto.getCiEmpleado());
//        variables.put("fechaInicio", dto.getFechaInicio());
//        variables.put("fechaFin", dto.getFechaFin());
//        variables.put("motivo", dto.getMotivo());
//        variables.put("usuarioAsignado", dto.getUsuarioAsignado());
//
//        return procesoService.iniciarProceso("solicitud_vacaciones", variables);
//    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/iniciar/solicitud-vacaciones")
    public String iniciarVacaciones(@Valid @RequestBody SolicitudVacacionesDTO dto) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("ciEmpleado", dto.getCiEmpleado());
        variables.put("fechaInicio", dto.getFechaInicio());
        variables.put("fechaFin", dto.getFechaFin());
        variables.put("motivo", dto.getMotivo());
        variables.put("usuarioAsignado", dto.getUsuarioAsignado());

        // 🔥 Agregar el nrotramite
        int nroTramite = generarNroTramite(); // puedes mejorar este método
        variables.put("nrotramite", nroTramite);

        return procesoService.iniciarProceso("solicitud_vacaciones", variables);
    }

    private int generarNroTramite() {
        return (int) (System.currentTimeMillis() % 100000000); // algo simple, temporalmente único
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

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/solicitudes-vacaciones/pendientes")
    public List<Map<String, Object>> obtenerSolicitudesVacacionesPendientes() {
        List<Task> tareas = taskService.createTaskQuery()
                .processDefinitionKey("solicitud_vacaciones")
                .taskAssignee("rrhh") // o .taskCandidateGroup("rrhh") si usas grupos
                .active()
                .list();

        List<Map<String, Object>> solicitudes = new ArrayList<>();
        for (Task tarea : tareas) {
            Map<String, Object> variables = taskService.getVariables(tarea.getId());
            variables.put("taskId", tarea.getId()); // útil para luego aprobar
            solicitudes.add(variables);
        }

        return solicitudes;
    }

    @GetMapping("/seguimiento/listar")
    public List<FlujoSeguimiento> listarSeguimiento() {
        return seguimientoRepository.findAll();
    }

//    @GetMapping("/tareas/seguimiento/{taskId}")
//    public ResponseEntity<List<FlujoSeguimiento>> obtenerSeguimientoPorTarea(@PathVariable String taskId) {
//        List<FlujoSeguimiento> seguimiento = FlujoSeguimientoRepository.findByTaskId(taskId);
//        return ResponseEntity.ok(seguimiento);
//    }





}

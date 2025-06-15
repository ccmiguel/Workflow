package com.empresa.bpm.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;

public class SolicitudVacacionesDTO {
    @NotBlank(message = "El CI del empleado es obligatorio")
    @Pattern(regexp = "\\d{6,10}", message = "El CI debe tener entre 6 y 10 dígitos")
    private String ciEmpleado;

    @NotBlank(message = "Fecha de inicio requerida")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String fechaInicio;

    @NotBlank(message = "Fecha de fin requerida")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String fechaFin;

    private String motivo;

    private String usuarioAsignado;

    // Getters y Setters
    public String getCiEmpleado() { return ciEmpleado; }
    public void setCiEmpleado(String ciEmpleado) { this.ciEmpleado = ciEmpleado; }

    public String getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(String fechaInicio) { this.fechaInicio = fechaInicio; }

    public String getFechaFin() { return fechaFin; }
    public void setFechaFin(String fechaFin) { this.fechaFin = fechaFin; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public String getUsuarioAsignado() {
        return usuarioAsignado;
    }

    public void setUsuarioAsignado(String usuarioAsignado) {
        this.usuarioAsignado = usuarioAsignado;
    }
}

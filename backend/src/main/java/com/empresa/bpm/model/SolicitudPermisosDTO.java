package com.empresa.bpm.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class SolicitudPermisosDTO {
    @NotBlank(message = "El CI del empleado es obligatorio")
    @Pattern(regexp = "\\d{6,10}", message = "El CI debe tener entre 6 y 10 dígitos")
    private String ciEmpleado;

    @NotBlank(message = "La fecha del permiso es obligatoria")
    private String fecha;

    @NotBlank(message = "El tipo de permiso es obligatorio")
    private String tipoPermiso;

    private String horas; // opcional

    private String justificacion;

    private String usuarioAsignado;

    // Getters y setters

    public String getCiEmpleado() {
        return ciEmpleado;
    }

    public void setCiEmpleado(String ciEmpleado) {
        this.ciEmpleado = ciEmpleado;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getTipoPermiso() {
        return tipoPermiso;
    }

    public void setTipoPermiso(String tipoPermiso) {
        this.tipoPermiso = tipoPermiso;
    }

    public String getHoras() {
        return horas;
    }

    public void setHoras(String horas) {
        this.horas = horas;
    }

    public String getJustificacion() {
        return justificacion;
    }

    public void setJustificacion(String justificacion) {
        this.justificacion = justificacion;
    }

    public String getUsuarioAsignado() {
        return usuarioAsignado;
    }

    public void setUsuarioAsignado(String usuarioAsignado) {
        this.usuarioAsignado = usuarioAsignado;
    }
}

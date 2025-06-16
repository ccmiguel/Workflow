package com.empresa.bpm.model;
import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "flujoseguimiento")
@IdClass(FlujoSeguimientoPK.class)
public class FlujoSeguimiento {
    @Id
    private int nrotramite;
    @Id
    private String flujo;
    @Id
    private String proceso;

    private String usuario;

    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;

    public FlujoSeguimiento() {
    }

    public FlujoSeguimiento(int nrotramite, LocalDateTime fechaFin, LocalDateTime fechaInicio, String proceso, String usuario, String flujo) {
        this.nrotramite = nrotramite;
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
        this.proceso = proceso;
        this.usuario = usuario;
        this.flujo = flujo;
    }

    public int getNrotramite() {
        return nrotramite;
    }

    public void setNrotramite(int nrotramite) {
        this.nrotramite = nrotramite;
    }

    public String getFlujo() {
        return flujo;
    }

    public void setFlujo(String flujo) {
        this.flujo = flujo;
    }

    public String getProceso() {
        return proceso;
    }

    public void setProceso(String proceso) {
        this.proceso = proceso;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    // Getters y Setters
}

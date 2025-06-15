package com.empresa.bpm.model;

import jakarta.persistence.*;


@Entity
@Table(name = "flujoproceso")
public class FlujoPaso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Necesitamos un ID para usar JPA correctamente

    @Column(name = "Flujo")
    private String flujo;

    @Column(name = "Proceso")
    private String proceso;

    @Column(name = "Siguiente")
    private String siguiente;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "Rol")
    private String rol;

    @Column(name = "Pantalla")
    private String pantalla;

    // Constructores
    public FlujoPaso() {}

    public FlujoPaso(String flujo, String proceso, String siguiente, String tipo, String rol, String pantalla) {
        this.flujo = flujo;
        this.proceso = proceso;
        this.siguiente = siguiente;
        this.tipo = tipo;
        this.rol = rol;
        this.pantalla = pantalla;
    }

    // Getters y Setters
    public Long getId() {
        return id;
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

    public String getSiguiente() {
        return siguiente;
    }

    public void setSiguiente(String siguiente) {
        this.siguiente = siguiente;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getPantalla() {
        return pantalla;
    }

    public void setPantalla(String pantalla) {
        this.pantalla = pantalla;
    }
}

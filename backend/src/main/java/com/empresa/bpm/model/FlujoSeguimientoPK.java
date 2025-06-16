package com.empresa.bpm.model;

import java.io.Serializable;
import java.util.Objects;

public class FlujoSeguimientoPK implements Serializable {

    private int nrotramite;
    private String flujo;
    private String proceso;

    // Constructor vacío
    public FlujoSeguimientoPK() {}

    // Constructor con parámetros
    public FlujoSeguimientoPK(int nrotramite, String flujo, String proceso) {
        this.nrotramite = nrotramite;
        this.flujo = flujo;
        this.proceso = proceso;
    }

    // Getters y Setters
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

    // equals() y hashCode() son obligatorios para @IdClass
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FlujoSeguimientoPK)) return false;
        FlujoSeguimientoPK that = (FlujoSeguimientoPK) o;
        return nrotramite == that.nrotramite &&
                Objects.equals(flujo, that.flujo) &&
                Objects.equals(proceso, that.proceso);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nrotramite, flujo, proceso);
    }
}

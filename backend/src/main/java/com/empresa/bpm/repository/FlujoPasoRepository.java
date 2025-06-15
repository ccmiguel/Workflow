//package com.empresa.bpm.repository;
//
//import com.empresa.bpm.model.FlujoPaso;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface FlujoPasoRepository extends JpaRepository<FlujoPaso, Long> {
//    List<FlujoPaso> findByRolIgnoreCase(String rol);
//}

package com.empresa.bpm.repository;

import com.empresa.bpm.model.FlujoPaso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlujoPasoRepository extends JpaRepository<FlujoPaso, Long> {

    List<FlujoPaso> findByRolIgnoreCase(String rol);

    List<FlujoPaso> findByRolAndFlujo(String rol, String flujo);
    List<FlujoPaso> findByFlujo(String flujo);


    @Query("SELECT f.proceso FROM FlujoPaso f WHERE f.flujo = :flujo AND f.siguiente = :procesoActual")
    String findProcesoByFlujoAndSiguiente(@Param("flujo") String flujo, @Param("procesoActual") String procesoActual);

    // 👇 Esta línea es la que te faltaba
    Optional<FlujoPaso> findByFlujoAndProceso(String flujo, String proceso);
}

package com.empresa.bpm.repository;

import com.empresa.bpm.model.FlujoSeguimiento;
import com.empresa.bpm.model.FlujoSeguimientoPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlujoSeguimientoRepository extends JpaRepository<FlujoSeguimiento, FlujoSeguimientoPK> {
    List<FlujoSeguimiento> findByTaskId(String taskId);

}

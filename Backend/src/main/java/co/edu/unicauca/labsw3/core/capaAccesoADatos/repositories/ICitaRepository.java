package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.time.LocalDateTime;
import java.util.List;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Cita;

public interface ICitaRepository {
    List<Cita> findAll();
    List<Cita> findByPacienteCedula(Long cedula);
    boolean existsByProfesionalAndFecha(Long cedulaProfesional, LocalDateTime fecha);
    boolean existsByPacienteAndFecha(Long cedulaPaciente, LocalDateTime fecha);
    Cita save(Cita cita);
}

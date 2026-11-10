package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Paciente;

public interface IPacienteRepository {
    List<Paciente> findAll();
    Paciente findByCedula(Long cedula);
    Paciente save(Paciente paciente);
}

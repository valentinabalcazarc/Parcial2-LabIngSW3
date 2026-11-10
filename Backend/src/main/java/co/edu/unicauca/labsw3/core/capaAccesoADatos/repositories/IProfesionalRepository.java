package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Profesional;

public interface IProfesionalRepository {
    List<Profesional> findAll();
    Profesional findByCedula(Long cedula);
    Profesional save(Profesional profesional);
}

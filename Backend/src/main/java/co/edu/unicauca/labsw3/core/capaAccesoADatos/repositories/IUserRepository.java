package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;

public interface IUserRepository {
    List<User> findAll();
    User findById(int id);
    User findByCedula(Long cedula);
    boolean existsByCedula(Long cedula);
    boolean existsByEmail(String email);
    User save(User user);
}

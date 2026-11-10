package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.RoleEnum;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;
import co.edu.unicauca.labsw3.core.capaServices.DTO.request.SignupRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.UserDTO;

public interface IUserService {

    /** Valida (cédula y email únicos), encripta la clave y guarda el usuario con el rol dado. */
    User crearUsuario(SignupRequestDTO datos, RoleEnum rol);

    List<UserDTO> findAll();

    UserDTO findByCedula(Long cedula);
}

package co.edu.unicauca.labsw3.core.capaServices.services;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.LoginRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.JwtResponseDTO;

public interface AuthInt {
    JwtResponseDTO authenticateUser(LoginRequestDTO loginRequest);
}

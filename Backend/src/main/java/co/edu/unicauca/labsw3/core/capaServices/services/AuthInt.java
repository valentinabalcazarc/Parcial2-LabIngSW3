package co.edu.unicauca.labsw3.core.capaServices.services;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.LoginRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.request.SignupRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.JwtResponseDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.MessageResponseDTO;


public interface AuthInt {
    JwtResponseDTO authenticateUser( LoginRequestDTO loginRequest);
    MessageResponseDTO registerUser(SignupRequestDTO signUpRequest);
}
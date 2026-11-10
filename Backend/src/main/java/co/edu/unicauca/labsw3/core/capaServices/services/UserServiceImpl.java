package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.RoleEnum;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.IUserRepository;
import co.edu.unicauca.labsw3.core.capaServices.DTO.request.SignupRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.UserDTO;
import co.edu.unicauca.labsw3.core.capaServices.excepciones.EntidadNoExisteException;
import co.edu.unicauca.labsw3.core.capaServices.excepciones.EntidadYaExisteException;
import co.edu.unicauca.labsw3.core.capaServices.mapper.DtoMapper;

@Service
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder encoder;
    private final DtoMapper mapper;

    public UserServiceImpl(IUserRepository userRepository, PasswordEncoder encoder, DtoMapper mapper) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.mapper = mapper;
    }

    @Override
    public User crearUsuario(SignupRequestDTO datos, RoleEnum rol) {
        if (userRepository.existsByCedula(datos.getCedula())) {
            throw new EntidadYaExisteException("Ya existe un usuario con la cédula " + datos.getCedula());
        }
        if (userRepository.existsByEmail(datos.getEmail())) {
            throw new EntidadYaExisteException("Ya existe un usuario con el email " + datos.getEmail());
        }
        User user = new User();
        user.setCedula(datos.getCedula());
        user.setEmail(datos.getEmail().trim());
        user.setNombre(datos.getNombre().trim());
        user.setApellido(datos.getApellido().trim());
        user.setPassword(encoder.encode(datos.getPassword()));
        user.setRole(rol);
        return userRepository.save(user);
    }

    @Override
    public List<UserDTO> findAll() {
        List<UserDTO> usuariosDTO = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            usuariosDTO.add(mapper.toUserDTO(user));
        }
        return usuariosDTO;
    }

    @Override
    public UserDTO findByCedula(Long cedula) {
        User user = userRepository.findByCedula(cedula);
        if (user == null) {
            throw new EntidadNoExisteException("No existe un usuario con la cédula " + cedula);
        }
        return mapper.toUserDTO(user);
    }
}

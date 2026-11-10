package co.edu.unicauca.labsw3.core.capaAccesoADatos.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Usuario del sistema. Es la base de Paciente, Profesional y Administrador.
 * El login se hace con cédula + contraseña.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int id;
    private Long cedula;
    private String email;
    private String nombre;
    private String apellido;
    private String password;
    private RoleEnum role;
}

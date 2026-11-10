package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Repository;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.RoleEnum;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;

/**
 * Repositorio en memoria de usuarios.
 */
@Repository
public class UserRepositoryImpl implements IUserRepository {

    private final List<User> listaDeUsers = new CopyOnWriteArrayList<>();
    private final AtomicInteger secuencia = new AtomicInteger(1);

    public UserRepositoryImpl() {
        cargarUsers();
    }

    private void cargarUsers() {
        String claveAdmin = "$2a$10$4l1O89p.J9F.SXQo5xA64e7wkp3FBuFPBy0RkiOPfHq4Dwsv34ySu"; //admin123
        String claveMedico = "$2a$10$eUR8G6iW05MHp1st8tSEj.NyBTtFxbmLZ1PQRLKhbeCA6giY8QMwC"; //medico123
        String clavePaciente = "$2a$10$NGjFS5YIB3HkbpHQQ8VgwOvhL2YOe5TCr7aUn5XV1YB6MVM2SI1g6"; //paciente123

        this.listaDeUsers.add(new User(secuencia.getAndIncrement(), 1001L, "admin@piedraazul.com",
                "Admin", "Sistema", claveAdmin, RoleEnum.ADMIN));

        this.listaDeUsers.add(new User(secuencia.getAndIncrement(), 2001L, "carlos.ruiz@piedraazul.com",
                "Carlos", "Ruiz", claveMedico, RoleEnum.MEDICO));
        this.listaDeUsers.add(new User(secuencia.getAndIncrement(), 2002L, "laura.diaz@piedraazul.com",
                "Laura", "Díaz", claveMedico, RoleEnum.MEDICO));

        this.listaDeUsers.add(new User(secuencia.getAndIncrement(), 3001L, "ana.gomez@gmail.com",
                "Ana", "Gómez", clavePaciente, RoleEnum.PACIENTE));
        this.listaDeUsers.add(new User(secuencia.getAndIncrement(), 3002L, "pedro.lopez@gmail.com",
                "Pedro", "López", clavePaciente, RoleEnum.PACIENTE));
    }

    @Override
    public List<User> findAll() {
        System.out.println("Invocando a listar usuarios");
        return new ArrayList<>(listaDeUsers);
    }

    @Override
    public User findById(int id) {

        System.out.println("Invocando a consultar un usuario por id");
        User objUser = null;

        for (User cliente : listaDeUsers) {
            if (cliente.getId() == id) {
                objUser = cliente;
                break;
            }
        }

        return objUser;
    }

    @Override
    public User findByCedula(Long cedula) {
        System.out.println("Invocando a consultar un usuario por cedula");
        User objUser = null;

        for (User cliente : listaDeUsers) {
            if (cliente.getCedula().equals(cedula)) {
                objUser = cliente;
                break;
            }
        }

        return objUser;
    }

    @Override
    public boolean existsByCedula(Long cedula) {
        System.out.println("Invocando verificar si existe un usuario con cedula");
        Boolean bandera = false;

        for (User user : listaDeUsers) {
            if (user.getCedula().equals(cedula)) {
                bandera = true;
                break;
            }
        }
        return bandera;
    }

    @Override
    public boolean existsByEmail(String email) {
        System.out.println("Invocando verificar si existe un usuario con email");
        Boolean bandera = false;

        for (User user : listaDeUsers) {
            if (user.getEmail().equalsIgnoreCase(email)) {
                bandera = true;
                break;
            }
        }
        return bandera;
    }

    @Override
    public User save(User user) {
        System.out.println("Invocando a almacenar usuario");
        user.setId(secuencia.getAndIncrement());
        listaDeUsers.add(user);
        return user;
    }
}

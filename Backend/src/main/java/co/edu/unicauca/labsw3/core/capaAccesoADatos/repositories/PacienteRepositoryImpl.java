package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Repository;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Paciente;

@Repository
public class PacienteRepositoryImpl implements IPacienteRepository {

    private final List<Paciente> listaDePacientes = new CopyOnWriteArrayList<>();
    private final IUserRepository userRepository;

    public PacienteRepositoryImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
        cargarPacientes();
    }

    private void cargarPacientes() {
        this.listaDePacientes.add(new Paciente(userRepository.findByCedula(3001L), LocalDate.of(2000, 5, 21)));
        this.listaDePacientes.add(new Paciente(userRepository.findByCedula(3002L), LocalDate.of(1995, 11, 3)));
    }

    @Override
    public List<Paciente> findAll() {
        System.out.println("Invocando a listar pacientes");
        return new ArrayList<>(listaDePacientes);
    }

    @Override
    public Paciente findByCedula(Long cedula) {
        System.out.println("Invocando a consultar un paciente");
        Paciente objPaciente = null;

        for (Paciente p : listaDePacientes) {
            if (p.getUser().getCedula().equals(cedula)) {
                objPaciente = p;
                break;
            }
        }

        return objPaciente;
    }

    @Override
    public Paciente save(Paciente paciente) {
        System.out.println("Invocando a almacenar paciente");
        listaDePacientes.add(paciente);
        return paciente;
    }
}

package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Repository;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Cita;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Paciente;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Profesional;

@Repository
public class CitaRepositoryImpl implements ICitaRepository {

    private final List<Cita> listaDeCitas = new CopyOnWriteArrayList<>();
    private final AtomicInteger secuencia = new AtomicInteger(1);
    private final IPacienteRepository pacienteRepository;
    private final IProfesionalRepository profesionalRepository;

    public CitaRepositoryImpl(IPacienteRepository pacienteRepository, IProfesionalRepository profesionalRepository) {
        this.pacienteRepository = pacienteRepository;
        this.profesionalRepository = profesionalRepository;
        cargarCitas();
    }

    /** Datos quemados: citas entre los pacientes y profesionales precargados. */
    private void cargarCitas() {
        Paciente ana = pacienteRepository.findByCedula(3001L);
        Paciente pedro = pacienteRepository.findByCedula(3002L);
        Profesional carlos = profesionalRepository.findByCedula(2001L);
        Profesional laura = profesionalRepository.findByCedula(2002L);

        this.listaDeCitas.add(new Cita(secuencia.getAndIncrement(), carlos, ana, LocalDateTime.of(2026, 12, 10, 8, 0)));
        this.listaDeCitas.add(new Cita(secuencia.getAndIncrement(), laura, ana, LocalDateTime.of(2026, 12, 12, 14, 30)));
        this.listaDeCitas.add(new Cita(secuencia.getAndIncrement(), carlos, pedro, LocalDateTime.of(2026, 12, 11, 10, 0)));
    }

    @Override
    public List<Cita> findAll() {
        System.out.println("Invocando a listar citas");
        return new ArrayList<>(listaDeCitas);
    }

    @Override
    public List<Cita> findByPacienteCedula(Long cedula) {
        System.out.println("Invocando a consultar una cita por paciente");
        List<Cita> citasPaciente = new ArrayList<>();

        for (Cita cita : listaDeCitas) {
            if (cita.getPaciente().getUser().getCedula().equals(cedula)) {
                citasPaciente.add(cita);
            }
        }

        return citasPaciente;
    }

    @Override
    public boolean existsByProfesionalAndFecha(Long cedulaProfesional, LocalDateTime fecha) {
        System.out.println("Invocando verificar si existe una cita por profesional y fecha");
        Boolean bandera = false;

        for (Cita c : listaDeCitas) {
            if (c.getProfesional().getUser().getCedula().equals(cedulaProfesional)
                    && c.getFecha().equals(fecha)) {
                bandera = true;
                break;
            }
        }
        return bandera;
    }

    @Override
    public boolean existsByPacienteAndFecha(Long cedulaPaciente, LocalDateTime fecha) {
        System.out.println("Invocando verificar si existe una cita por paciente y fecha");
        Boolean bandera = false;

        for (Cita c : listaDeCitas) {
            if (c.getPaciente().getUser().getCedula().equals(cedulaPaciente)
                    && c.getFecha().equals(fecha)) {
                bandera = true;
                break;
            }
        }
        return bandera;
    }

    @Override
    public Cita save(Cita cita) {
        cita.setId(secuencia.getAndIncrement());
        listaDeCitas.add(cita);
        return cita;
    }
}

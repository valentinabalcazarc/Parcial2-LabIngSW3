package co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Repository;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Profesional;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.TipoProfEnum;

@Repository
public class ProfesionalRepositoryImpl implements IProfesionalRepository {

    private final List<Profesional> listaDeProfesionales = new CopyOnWriteArrayList<>();
    private final IUserRepository userRepository;

    public ProfesionalRepositoryImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
        cargarProfesionales();
    }

    private void cargarProfesionales() {
        this.listaDeProfesionales.add(new Profesional(userRepository.findByCedula(2001L), TipoProfEnum.DOCTOR));
        this.listaDeProfesionales.add(new Profesional(userRepository.findByCedula(2002L), TipoProfEnum.TERAPEUTA));
    }

    @Override
    public List<Profesional> findAll() {
        System.out.println("Invocando a listar profesionales");
        return new ArrayList<>(listaDeProfesionales);
    }

    @Override
    public Profesional findByCedula(Long cedula) {
        System.out.println("Invocando a consultar un profesional");
        Profesional objProfesional = null;

        for (Profesional p : listaDeProfesionales) {
            if (p.getUser().getCedula().equals(cedula)) {
                objProfesional = p;
                break;
            }
        }

        return objProfesional;
    }

    @Override
    public Profesional save(Profesional profesional) {
        System.out.println("Invocando a almacenar profesional");
        listaDeProfesionales.add(profesional);
        return profesional;
    }
}

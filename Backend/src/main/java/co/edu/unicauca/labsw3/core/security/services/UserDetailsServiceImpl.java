package co.edu.unicauca.labsw3.core.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.IUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    IUserRepository userRepository;

    // El username que llega es la cédula
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;
        try {
            user = userRepository.findByCedula(Long.valueOf(username));
        } catch (NumberFormatException e) {
            // si la cédula no es numérica se trata como usuario no encontrado
        }

        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }

        return UserDetailsImpl.build(user);
    }

}

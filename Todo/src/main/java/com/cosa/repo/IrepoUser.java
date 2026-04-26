package com.cosa.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cosa.model.UserModel;


@Repository
public interface IrepoUser extends JpaRepository<UserModel, Integer> {
 	Optional<UserModel> findByUsername(String username);

}

package com.cosa.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cosa.model.TodoModel;

@Repository
public interface IRepo extends JpaRepository<TodoModel, Integer>{
}

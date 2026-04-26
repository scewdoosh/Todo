package com.cosa.service;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cosa.model.TodoModel;
import com.cosa.model.TodoRequest;
import com.cosa.model.UserModel;


public interface IService {
	
	ResponseEntity<TodoModel> addTodoModel(TodoRequest model, String username);
	
	ResponseEntity<UserModel> addUserModel(UserModel model);
	
	ResponseEntity<String> deleteUserModel(Integer id);

	ResponseEntity<String> deleteTodoModel(Integer id);
	
	ResponseEntity<String> update(Integer id, String msg);

	ResponseEntity<String> updateTitle(Integer id, String msg);
	
	List<TodoModel> findAll();
}

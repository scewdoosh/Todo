package com.cosa.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cosa.model.TodoModel;
import com.cosa.model.TodoRequest;
import com.cosa.model.UserModel;
import com.cosa.service.IService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api")
public class ControlRoom {
	
	@Autowired
	private IService service;
	
	@GetMapping("/swagger")
	public void swaggerRedirect(HttpServletResponse res) throws IOException {
		res.sendRedirect("/swagger-ui.html");
	}
	
	@GetMapping("/test")
	public String testMethod(){
		return "application is running :)";
	}
	@GetMapping("/test-lock")
	public String testMethodLock(){
		return "authentication is running :)";
	}
	
	@GetMapping("/get-all")
	public List<TodoModel> getAll(){
		return service.findAll();
	}
	
	@PostMapping("/post-user")
	public ResponseEntity<UserModel> postMethod(@RequestBody UserModel entity) {
		return service.addUserModel(entity);
	}
	
	@PostMapping("/post-todo")
	public ResponseEntity<TodoModel> postMethod(@RequestBody TodoRequest entity,Authentication auth) {
		return service.addTodoModel(entity,auth.getName());
	}
	
	@PatchMapping("/update-desc/{id}")
	public ResponseEntity<String> patchMethod(@RequestParam Integer id , @RequestBody String msg) {
		return service.update(id, msg);
	}
	@PatchMapping("/update-title/{id}")
	public ResponseEntity<String> patchMethodForTitle(@RequestParam Integer id , @RequestBody String msg) {
		return service.updateTitle(id, msg);
	}
	
	@DeleteMapping("/delete-todo/{id}")
	public ResponseEntity<String> deleteMethod(@RequestParam Integer id) {
		return service.deleteTodoModel(id);
	}
	
	@DeleteMapping("/delete-user/{id}")
	public ResponseEntity<String> deleteUserEntity(@RequestParam Integer id) {
		return service.deleteUserModel(id);
	}
	
}

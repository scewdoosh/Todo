package com.cosa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cosa.model.TodoModel;
import com.cosa.model.TodoRequest;
import com.cosa.model.UserModel;
import com.cosa.repo.IRepo;
import com.cosa.repo.IrepoUser;

@Service
public class ServiceClass implements IService,UserDetailsService{

	@Autowired
	private IRepo repo;
	@Autowired
	private IrepoUser repoUser;
	
	@Override
	public ResponseEntity<TodoModel> addTodoModel(TodoRequest model,String username) {
		Optional<UserModel> user = repoUser.findByUsername(username);
		if(user.isEmpty()) return new ResponseEntity<TodoModel>(HttpStatus.UNAUTHORIZED);
		TodoModel model2 = new TodoModel(user.get(),model.getTitle(),model.getDes());
		repo.save(model2);
		return new ResponseEntity<TodoModel>(model2,HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteTodoModel(Integer id) {
		repo.deleteById(id);
		return new ResponseEntity<String>("no-data",HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<String> update(Integer id,String msg) {
		Optional<TodoModel> model = repo.findById(id);
		if(model.isEmpty()) {
			return new ResponseEntity<String>("no-data",HttpStatus.NOT_FOUND);
		}
		TodoModel mod = model.get();
		mod.setDes(msg);
		repo.save(mod);
		return new ResponseEntity<String>("updated",HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> updateTitle(Integer id, String msg) {
		Optional<TodoModel> model = repo.findById(id);
		if(model.isEmpty()) {
			return new ResponseEntity<String>("no-data",HttpStatus.NOT_FOUND);
		}
		TodoModel mod = model.get();
		mod.setTitle(msg);
		repo.save(mod);
		return new ResponseEntity<String>("updated",HttpStatus.OK);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	 	 Optional<UserModel> obj = repoUser.findByUsername(username);
	 	 if(obj.isEmpty()) throw new UsernameNotFoundException("user not found with name " + username);
		return new UserPrinciples(obj.get());
	}

	@Override
	public ResponseEntity<UserModel> addUserModel(UserModel model) {
		String passString = model.getPassword();
		BCryptPasswordEncoder enc = new BCryptPasswordEncoder(12);
		model.setPassword(enc.encode(passString));
		repoUser.save(model);
		return new ResponseEntity<UserModel>(model,HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteUserModel(Integer id) {
		Optional<UserModel> mod = repoUser.findById(id);
		if(mod.isPresent()) {
			repo.deleteById(id);
			return new ResponseEntity<String>("user with username :"+ mod.get().getUsername() +" deleted",HttpStatus.OK);
		}
		return new ResponseEntity<String>("user not found",HttpStatus.NOT_FOUND);
	}

	@Override
	public List<TodoModel> findAll() {
		return repo.findAll();
	}

	
}

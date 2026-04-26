package com.cosa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class TodoModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true,nullable = false)
	@NotBlank
	private String title;
	
	@Column(nullable = false)
	@NotBlank
	private String des;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserModel user;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public TodoModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TodoModel(UserModel user, @NotBlank String title, @NotBlank String des) {
		super();
		this.user = user;
		this.title = title;
		this.des = des;
	}

	

	
	
}

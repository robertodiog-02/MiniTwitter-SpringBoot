package com.example.dioguardiproject.entity;

public class UserDTO {

    private Long id;
    private String username;
    private String nome;
    private String cognome;
    private String email;

    // Costruttori, getter e setter

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.nome = user.getNome();
        this.cognome = user.getCognome();
        this.email = user.getEmail();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

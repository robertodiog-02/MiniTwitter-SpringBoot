package com.example.dioguardiproject.entity;

import java.time.LocalDate;
import java.time.LocalTime;

public class CommentDTO {
    private Long id;
    private String text;
    private String authorUsername;
    private String authorFullName;
    private LocalDate date;
    private LocalTime time;


    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.text = comment.getText();
        this.authorUsername = comment.getAuthor().getUsername();
        this.authorFullName = comment.getAuthor().getNome() + " " + comment.getAuthor().getCognome();
        this.date = comment.getDate();
        this.time = comment.getTime();
    }

    // Getter and Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public String getAuthorFullName() {
        return authorFullName;
    }

    public void setAuthorFullName(String authorFullName) {
        this.authorFullName = authorFullName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
                "id=" + id +
                ", authorFullName='" + authorFullName + '\'' +
                ", authorUsername='" + authorUsername + '\'' +
                ", date=" + date +
                ", time=" + time +
                ", text='" + text + '\'' +
                '}';
    }
}

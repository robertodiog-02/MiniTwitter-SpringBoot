package com.example.dioguardiproject.entity;

import java.time.LocalDate;
import java.time.LocalTime;

public class PostDTO {
    private Long id;
    private String title;
    private String preview;
    private String content;
    private String authorUsername;
    private String authorFullName;
    private LocalDate date;
    private LocalTime time;
    private int commentCount;


    public PostDTO(Post post, int commentCount) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.preview = post.getPreview();
        this.content = post.getContent();
        this.authorUsername = post.getAuthor().getUsername();
        this.authorFullName = post.getAuthor().getNome() + " " + post.getAuthor().getCognome();
        this.date = post.getDate();
        this.time = post.getTime();
        this.commentCount = commentCount;
    }

    public PostDTO(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.preview = post.getPreview();
        this.content = post.getContent();
        this.authorUsername = post.getAuthor().getUsername();
        this.authorFullName = post.getAuthor().getNome() + " " + post.getAuthor().getCognome();
        this.date = post.getDate();
        this.time = post.getTime();
        this.commentCount = 0; // Valore di default
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    @Override
    public String toString() {
        return "PostDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", preview='" + preview + '\'' +
                ", content='" + content + '\'' +
                ", authorUsername='" + authorUsername + '\'' +
                ", authorFullName='" + authorFullName + '\'' +
                ", date=" + date +
                ", time=" + time +
                ", num_comments=" + commentCount +
                '}';
    }

}

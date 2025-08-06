package com.example.dioguardiproject.service.impl;

import com.example.dioguardiproject.entity.Comment;
import com.example.dioguardiproject.entity.CommentDTO;
import com.example.dioguardiproject.entity.Post;
import com.example.dioguardiproject.entity.User;
import com.example.dioguardiproject.repository.CommentRepository;
import com.example.dioguardiproject.repository.PostRepository;
import com.example.dioguardiproject.repository.UserRepository;
import com.example.dioguardiproject.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public List<CommentDTO> getRecentComments(Long postId, int offset, int limit) {
        // Crea un Pageable con offset e limit
        Pageable pageable = PageRequest.of(offset / limit, limit);

        Page<Comment> commentPage = commentRepository.findByPostIdOrderByDateDescTimeDesc(postId, pageable);

        // Mappa i commenti a CommentDTO
        return commentPage.getContent().stream()
                .map(CommentDTO::new)
                .collect(Collectors.toList());
        //getContent restituisce una lista, stream trasforma la lista in uno stream che permette di applicare filtri
        //e trasformazioni, map applica una funzione a ogni elemento dello stream, in questo caso chiama il costruttore
        //di commentDto che accetta un comment, poi collect trasfroma lo stream in una collezione, e poi si trafsroma
        //una lista
    }

    @Override
    public CommentDTO addCommentToPost(Comment comment) {

        Post post = postRepository.findById(comment.getPost().getId())
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + comment.getPost().getId()));

        User user = userRepository.findById(comment.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + comment.getAuthor().getId()));

        comment.setPost(post);
        comment.setAuthor(user);

        Comment savedComment = commentRepository.save(comment);
        // Restituisco un CommentDTO basato sul commento appena salvato
        return new CommentDTO(savedComment);
    }
}

package com.example.dioguardiproject.service.impl;

import com.example.dioguardiproject.entity.*;
import com.example.dioguardiproject.repository.PostRepository;
import com.example.dioguardiproject.repository.UserRepository;
import com.example.dioguardiproject.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<PostDTO> getRecentPosts(int offset, int limit) {

        // Crea un Pageable con offset e limit
        Pageable pageable = PageRequest.of(offset / limit, limit);

        Page<Post> postPage = postRepository.findAllByOrderByDateDescTimeDesc(pageable);

        return postPage.getContent().stream()
                .map(post -> {
                    int commentCount = postRepository.countCommentsByPostId(post.getId());
                    return new PostDTO(post, commentCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    public PostDTO getPostDetails(Long id) {
        // Recupera il post dal repository
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post non trovato"));

        // Converte il post in PostDTO e ritorna 0 come comment count tanto non serve
        return new PostDTO(post);
    }


    // Crea un nuovo post
    @Override
    public PostDTO createPost(Post post) {
        // Verifica se l'autore esiste nel database e recupero il resto delle informazioni
        User author = userRepository.findById(post.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("Autore con ID " + post.getAuthor().getId() + " non trovato"));
        // Associa l'autore al post
        post.setAuthor(author);

        Post savedPost = postRepository.save(post);

        return new PostDTO(savedPost);
    }


}

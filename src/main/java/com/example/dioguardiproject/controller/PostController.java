package com.example.dioguardiproject.controller;

import com.example.dioguardiproject.entity.Post;
import com.example.dioguardiproject.entity.PostDTO;
import com.example.dioguardiproject.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private TemplateEngine templateEngine;

    @GetMapping(value = "/generateXmlPosts", produces = "application/xml")
    public @ResponseBody String generateXmlPostList(Model model, @RequestParam int offset, @RequestParam int limit) {
        // Ottieni i post dal servizio
        List<PostDTO> posts = postService.getRecentPosts(offset, limit);

        model.addAttribute("posts", posts);

        Context context = new Context();
        context.setVariables(model.asMap());

        return templateEngine.process("posts-template", context);
    }

    @GetMapping(value = "/generateXmlPost/{id}", produces = "application/xml")
        public @ResponseBody String generateXmlSinglePost(Model model, @PathVariable Long id ) {
        // Ottieni il post dal servizio
        PostDTO post = postService.getPostDetails(id);

        // Creo una lista con un solo elemento
        List<PostDTO> posts = new ArrayList<>();
        posts.add(post);

        model.addAttribute("posts", posts);

        Context context = new Context();
        context.setVariables(model.asMap());

        return templateEngine.process("posts-template", context);
    }


    @PostMapping(value = "/create", produces = "application/xml")
    public ResponseEntity<String> createPost(@RequestBody Post post, Model model) {
        try {
            // Creo il post tramite il servizio
            PostDTO savedPost = postService.createPost(post);

            // Creo una lista con un solo elemento
            List<PostDTO> posts = new ArrayList<>();
            posts.add(savedPost);

            model.addAttribute("posts", posts);

            Context context = new Context();
            context.setVariables(model.asMap());

            String xmlResponse = templateEngine.process("posts-template", context);

            // Restituisce una risposta con il contenuto XML e lo status 201
            return ResponseEntity.status(HttpStatus.CREATED).body(xmlResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}
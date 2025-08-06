package com.example.dioguardiproject.controller;


import com.example.dioguardiproject.entity.Comment;
import com.example.dioguardiproject.entity.CommentDTO;
import com.example.dioguardiproject.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.thymeleaf.context.Context;
import org.thymeleaf.TemplateEngine;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private TemplateEngine templateEngine;

    @GetMapping(value = "/generateXmlComments", produces = "application/xml")
    public @ResponseBody String getCommentsAsXml(@RequestParam Long postId,
                                                 @RequestParam int offset,
                                                 @RequestParam int limit,
                                                 Model model) {
        // Ottengo i commenti dal service
        List<CommentDTO> comments = commentService.getRecentComments(postId, offset, limit);

        model.addAttribute("comments", comments);

        Context context = new Context();
        context.setVariables(model.asMap());

        return templateEngine.process("comments-template", context);
    }

    @PostMapping(value = "/create", produces = "application/xml")
    public ResponseEntity<String> createComment(@RequestBody Comment comment, Model model) {
        try {
            // Aggiungi il commento al post tramite il servizio
            CommentDTO savedComment = commentService.addCommentToPost(comment);

            // Crea una lista con un solo elemento
            List<CommentDTO> comments = new ArrayList<>();
            comments.add(savedComment);

            model.addAttribute("comments", comments);

            Context context = new Context();
            context.setVariables(model.asMap());

            String xmlResponse = templateEngine.process("comments-template", context);

            return ResponseEntity.status(HttpStatus.CREATED).body(xmlResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}
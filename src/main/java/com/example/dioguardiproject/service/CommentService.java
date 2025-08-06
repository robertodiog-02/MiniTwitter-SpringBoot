package com.example.dioguardiproject.service;

import com.example.dioguardiproject.entity.Comment;
import com.example.dioguardiproject.entity.CommentDTO;

import java.util.List;

public interface CommentService {

    List<CommentDTO> getRecentComments(Long postId, int offset, int limit);

    CommentDTO addCommentToPost(Comment comment);

}

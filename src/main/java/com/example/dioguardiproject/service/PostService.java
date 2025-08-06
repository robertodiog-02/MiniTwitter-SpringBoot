package com.example.dioguardiproject.service;

import com.example.dioguardiproject.entity.Comment;
import com.example.dioguardiproject.entity.Post;
import com.example.dioguardiproject.entity.PostDTO;

import java.util.List;

public interface PostService {

    PostDTO createPost(Post post);

    List<PostDTO> getRecentPosts(int offset, int limit);

    PostDTO getPostDetails(Long id);

}

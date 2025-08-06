package com.example.dioguardiproject.repository;

import com.example.dioguardiproject.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


public interface PostRepository extends JpaRepository<Post, Long> {

    // Metodo per ottenere i post con paginazione e ordinamento per data e ora
    @Query("SELECT p FROM Post p JOIN FETCH p.author ORDER BY p.date DESC, p.time DESC")
    Page<Post> findAllByOrderByDateDescTimeDesc(Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM comment c WHERE c.post_id = :postId", nativeQuery = true)
    int countCommentsByPostId(@Param("postId") Long postId);
    //l'annotazione param è necessaria soltanto nel caso di query native SQL

}


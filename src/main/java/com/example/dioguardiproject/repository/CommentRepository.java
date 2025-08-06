package com.example.dioguardiproject.repository;

import com.example.dioguardiproject.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c JOIN FETCH c.author WHERE c.post.id = :postId ORDER BY c.date DESC, c.time DESC")
    Page<Comment> findByPostIdOrderByDateDescTimeDesc(Long postId, Pageable pageable);
    //non è necessaria l'annotazione @pparam perché in jpql i parametri vengono asssociati automaticamente
    //grazie al nome nel metodo (Long postId, Pageable pageable); che è esattamente uguale
}

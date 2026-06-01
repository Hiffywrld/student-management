package com.school.student_management.repository;

import com.school.student_management.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByNameContainingIgnoreCase(String name);
    List<Teacher> findBySubject(String subject);
    List<Teacher> findByStatus(String status);
}
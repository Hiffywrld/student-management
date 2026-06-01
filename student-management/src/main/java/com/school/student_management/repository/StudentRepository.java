package com.school.student_management.repository;

import com.school.student_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Search by name
    List<Student> findByNameContainingIgnoreCase(String name);

    // Find by roll number
    Student findByRollNumber(String rollNumber);
}
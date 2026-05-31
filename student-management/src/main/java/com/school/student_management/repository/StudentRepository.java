
package com.school.student_management.repository;

import com.school.student_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Search students by first name or last name (case-insensitive)
    List<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
        String firstName, String lastName
    );

    // Filter students by department
    List<Student> findByDepartment(String department);

    // Filter students by level
    List<Student> findByLevel(String level);
}
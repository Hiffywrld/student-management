package com.school.student_management.service;

import com.school.student_management.model.Student;
import com.school.student_management.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get single student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    // Add new student
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    // Update existing student
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = getStudentById(id);
        existing.setFirstName(updatedStudent.getFirstName());
        existing.setLastName(updatedStudent.getLastName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setDepartment(updatedStudent.getDepartment());
        existing.setLevel(updatedStudent.getLevel());
        existing.setGpa(updatedStudent.getGpa());
        existing.setStatus(updatedStudent.getStatus());
        return studentRepository.save(existing);
    }

    // Delete student
    public void deleteStudent(Long id) {
        getStudentById(id); // will throw error if not found
        studentRepository.deleteById(id);
    }

    // Search students by name
    public List<Student> searchStudents(String keyword) {
        return studentRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        keyword, keyword
                );
    }

    // Filter by department
    public List<Student> getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }

    // Filter by level
    public List<Student> getStudentsByLevel(String level) {
        return studentRepository.findByLevel(level);
    }
}
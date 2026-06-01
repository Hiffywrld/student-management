package com.school.student_management.service;

import com.school.student_management.model.Student;
import com.school.student_management.model.Course;
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

    // Get student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    // Create student
    public Student createStudent(Student student) {
        if (student.getCourses() != null) {
            for (Course course : student.getCourses()) {
                course.setStudent(student);
            }
        }
        return studentRepository.save(student);
    }

    // Update student
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = getStudentById(id);
        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setRollNumber(updatedStudent.getRollNumber());
        existing.setCgpa(updatedStudent.getCgpa());
        existing.setParentEmail(updatedStudent.getParentEmail());

        existing.getCourses().clear();
        if (updatedStudent.getCourses() != null) {
            for (Course course : updatedStudent.getCourses()) {
                course.setStudent(existing);
                existing.getCourses().add(course);
            }
        }
        return studentRepository.save(existing);
    }

    // Delete student
    public void deleteStudent(Long id) {
        getStudentById(id);
        studentRepository.deleteById(id);
    }

    // Search by name
    public List<Student> searchStudents(String keyword) {
        return studentRepository.findByNameContainingIgnoreCase(keyword);
    }
}
package com.school.student_management.service;

import com.school.student_management.model.Teacher;
import com.school.student_management.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));
    }

    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(Long id, Teacher updatedTeacher) {
        Teacher existing = getTeacherById(id);
        existing.setName(updatedTeacher.getName());
        existing.setEmail(updatedTeacher.getEmail());
        existing.setEmployeeId(updatedTeacher.getEmployeeId());
        existing.setSubject(updatedTeacher.getSubject());
        existing.setPhone(updatedTeacher.getPhone());
        existing.setStatus(updatedTeacher.getStatus());
        return teacherRepository.save(existing);
    }

    public void deleteTeacher(Long id) {
        getTeacherById(id);
        teacherRepository.deleteById(id);
    }

    public List<Teacher> searchTeachers(String keyword) {
        return teacherRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Teacher> getTeachersBySubject(String subject) {
        return teacherRepository.findBySubject(subject);
    }
}

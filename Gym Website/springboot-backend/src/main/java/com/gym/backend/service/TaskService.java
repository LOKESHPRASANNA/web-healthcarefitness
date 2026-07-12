package com.gym.backend.service;

import com.gym.backend.entity.Task;
import com.gym.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(Long userId, String taskName) {
        Task task = Task.builder()
                .userId(userId)
                .taskName(taskName)
                .status(com.gym.backend.entity.TaskStatus.pending)
                .date(LocalDate.now())
                .build();
                
        return taskRepository.save(task);
    }

    public Task updateStatus(Long taskId, String status) throws Exception {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new Exception("Task not found"));
        
        task.setStatus(com.gym.backend.entity.TaskStatus.valueOf(status.toLowerCase()));
        return taskRepository.save(task);
    }

    public List<Task> getTasks(Long userId) {
        return taskRepository.findByUserIdOrderByDateDesc(userId);
    }
}

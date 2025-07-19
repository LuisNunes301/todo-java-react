import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import styles from './Task.module.css';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  section?: string;
}

export function TaskList() {
  const queryClient = useQueryClient();

  const { data } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/task');
      return response.data;
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: async ({
      taskId,
      completed,
    }: {
      taskId: number;
      completed: boolean;
    }) => {
      const response = await api.patch(
        `/task/${taskId}`,
        { completed },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const groupedTasks = (data || []).reduce((acc: Record<string, Task[]>, task: Task) => {
    const section = task.section || 'Minhas Tarefas';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(task);
    return acc;
  }, {});

  return (
    <div className={styles.taskList}>
      {Object.entries(groupedTasks).map(([section, tasks]) => (
        <div key={section} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section}</h2>
          {tasks.length === 0 ? (
            <p>Nenhuma tarefa nesta seção.</p>
          ) : (
            tasks.map((task: Task) => (
              <div key={task.id} className={styles.task}>
                <div className={styles.taskHeader}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>

                </div>
                   <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => {
                        updateTaskStatus.mutate({
                          taskId: task.id,
                          completed: e.target.checked,
                        });
                      }}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                <p className={styles.taskDescription}>{task.description}</p>
                <p className={styles.taskStatus}>
                  Status: {task.completed ? 'Concluída' : 'Pendente'}
                </p>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

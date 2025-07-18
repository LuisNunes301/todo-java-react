import { TaskList } from "../components/task/Task";

const Dashboard = () => {
  console.log("Dashboard carregado");
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskList />
    </div>
  );
};

export default Dashboard;
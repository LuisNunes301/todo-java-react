import { TaskList } from "../components/task/Task";
import styles from "./Dashboard.module.css"
const Dashboard = () => {
  console.log("Dashboard carregado");
  return (
    
    <div className={styles.container}>

      <h1 className={styles.title}>Dashboard</h1>
      <TaskList />

    </div>
  );
};

export default Dashboard;
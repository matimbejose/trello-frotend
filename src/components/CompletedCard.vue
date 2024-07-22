<template>
  <div class="card text-center mb-3 rounded">
    <div class="card-header text-start">Concluído</div>
    <div class="card-body">
      <ul v-if="tasks.length" class="list-group list-group-flush">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="list-group-item task-item d-flex justify-content-between align-items-center"
        >
          <h5 class="task-name mb-0">{{ task.attributes.name }}</h5>
          <div>
            <button class="btn btn-sm btn-light me-2" @click="editTask(task)">
              <font-awesome-icon :icon="['fas', 'pen']" />
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </li>
      </ul>
      <p v-else class="text-muted">Nenhuma tarefa concluída encontrada.</p>
    </div>
    <div class="card-footer">
      <button
        class="btn text-light w-100 d-flex justify-content-center align-items-center"
        @click="$emit('show-modal')"
      >
        <p><font-awesome-icon :icon="['fas', 'plus']" /> Adicionar Tarefa</p>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import baseURL from "../services/api";

export default {
  name: "CompletedCard",
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchCompletedTasks() {
      try {
        const token = localStorage.getItem("jwtToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${baseURL}/tasks/status/concluido`,
          config
        );

        if (response.data.status === 200) {
          this.tasks = response.data.data;
        } else {
          return;
        }
      } catch (error) {
        alert("Erro insperado. Tente novamente mais tarde");
      }
    },
    editTask(task) {
      this.$emit("edit-task", task);
    },
    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem("jwtToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(
          `${baseURL}/tasks/${taskId}`,
          config
        );

        if (response.data.status === 200) {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
        } else {
          return;
        }
      } catch (error) {
        alert("Erro insperado. Tente novamente mais tarde");
      }
    },
  },
  mounted() {
    this.fetchCompletedTasks();
  },
  watch: {
    tasks: {
      handler() {
        this.$emit("task-updated", this.tasks);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  background-color: #0c1304;
}

.card-header {
  font-weight: bold;
  background-color: #0c1304;
  border-color: #0c1304;
  text-align: left;
  color: #ffffff;
}

.card-body {
  background-color: #0c1304;
}

.card-footer {
  background-color: #0c1304;
  border-top: 1px solid #0c1304;
}

.btn {
  background-color: #0c1304;
  color: #ffffff;
  border: none;
}

.btn i {
  margin-right: 8px;
}

.list-group-item {
  background-color: #4e555d;
  color: #ffffff;
  padding-left: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
}

.task-name {
  font-size: 14px;
  margin: 0;
  text-align: left;
}
</style>

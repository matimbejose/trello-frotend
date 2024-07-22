<template>
  <div class="container-fluid dashboard">
    <HeaderHomeComponentVue />
    <div class="row py-5">
      <!-- Pode adicionar conteúdo aqui se desejar -->
    </div>
    <div class="row">
      <div class="col-md-4">
        <PendingCard
          @show-modal="showModal('pendente')"
          @edit-task="editTask"
          ref="pendingCard"
        />
      </div>
      <div class="col-md-4">
        <InProgressCard
          @show-modal="showModal('progresso')"
          @edit-task="editTask"
          ref="inProgressCard"
        />
      </div>
      <div class="col-md-4">
        <CompletedCard
          @show-modal="showModal('concluído')"
          @edit-task="editTask"
          ref="completedCard"
        />
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="taskModal"
      tabindex="-1"
      aria-labelledby="taskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="taskModalLabel">
              {{ isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="isEditing ? updateTask() : addTask()">
              <div class="mb-3">
                <label for="taskName" class="form-label">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  id="taskName"
                  v-model="newTask.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="taskDescription" class="form-label"
                  >Descrição</label
                >
                <textarea
                  class="form-control"
                  id="taskDescription"
                  rows="3"
                  v-model="newTask.description"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="taskStatus" class="form-label">Status</label>
                <select
                  class="form-select"
                  id="taskStatus"
                  v-model="newTask.status"
                  required
                >
                  <option value="" disabled>Escolha um status</option>
                  <option value="pendente">pendente</option>
                  <option value="progresso">progresso</option>
                  <option value="concluido">concluído</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                <i class="fas fa-plus"></i>
                {{ isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--/ Modal -->
  </div>
</template>

<script>
import HeaderHomeComponentVue from "../../components/HeaderHomeComponent.vue";
import PendingCard from "../../components/PendingCard.vue";
import InProgressCard from "../../components/InProgressCard.vue";
import CompletedCard from "../../components/CompletedCard.vue";
import axios from "axios";

export default {
  name: "DashBoardComponent",
  components: {
    HeaderHomeComponentVue,
    PendingCard,
    InProgressCard,
    CompletedCard,
  },
  data() {
    return {
      newTask: {
        name: "",
        description: "",
        status: "",
      },
      isEditing: false,
      editTaskId: null,
    };
  },
  methods: {
    showModal(status) {
      this.isEditing = false;
      this.newTask.status = status;
      const modal = new window.bootstrap.Modal(
        document.getElementById("taskModal")
      );
      modal.show();
    },
    async addTask() {
      try {
        const token = localStorage.getItem("jwtToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(
          "http://localhost:8989/api/v1/tasks",
          {
            name: this.newTask.name,
            description: this.newTask.description,
            status: this.newTask.status,
          },
          config
        );

        if (response.data.status === 200) {
          const newTask = response.data.data;

          if (newTask.attributes.status === "pendente") {
            this.$refs.pendingCard.fetchPendingTasks();
          } else if (newTask.attributes.status === "progresso") {
            this.$refs.inProgressCard.fetchInProgressTasks();
          } else if (newTask.attributes.status === "concluído") {
            this.$refs.completedCard.fetchCompletedTasks();
          }

          const modal = window.bootstrap.Modal.getInstance(
            document.getElementById("taskModal")
          );
          modal.hide();

          this.newTask = {
            name: "",
            description: "",
            status: "",
          };
        } else {
          console.error("Erro ao adicionar tarefa:", response.data.message);
        }
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    },
    editTask(task) {
      this.isEditing = true;
      this.editTaskId = task.id;
      this.newTask = {
        name: task.attributes.name,
        description: task.attributes.description,
        status: task.attributes.status || "",
      };
      const modal = new window.bootstrap.Modal(
        document.getElementById("taskModal")
      );
      modal.show();
    },
    async updateTask() {
      try {
        const token = localStorage.getItem("jwtToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.put(
          `http://localhost:8989/api/v1/tasks/${this.editTaskId}`,
          {
            name: this.newTask.name,
            description: this.newTask.description,
            status: this.newTask.status,
          },
          config
        );

        if (response.data.status === 200) {
          const updatedTask = response.data.data;

          if (updatedTask.attributes.status === "pendente") {
            this.$refs.pendingCard.fetchPendingTasks();
          } else if (updatedTask.attributes.status === "progresso") {
            this.$refs.inProgressCard.fetchInProgressTasks();
          } else if (updatedTask.attributes.status === "concluído") {
            this.$refs.completedCard.fetchCompletedTasks();
          }

          const modal = window.bootstrap.Modal.getInstance(
            document.getElementById("taskModal")
          );
          modal.hide();

          this.newTask = {
            name: "",
            description: "",
            status: "",
          };
          this.isEditing = false;
          this.editTaskId = null;
        } else {
          console.error("Erro ao atualizar a tarefa:", response.data.message);
        }
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.dashboard {
  min-height: 100vh; /* Ocupa pelo menos a altura total da tela */
  background-color: #054b95;
  display: flex;
  flex-direction: column;
}

.modal-content {
  border-radius: 10px;
}

/* Garantir alinhamento à esquerda para labels e inputs */
.modal-body .form-label {
  text-align: left;
  display: block; /* Garante que o label ocupe a largura total */
}

.modal-body .form-control,
.modal-body .form-select {
  text-align: left; /* Alinha o texto dentro dos inputs */
}
</style>

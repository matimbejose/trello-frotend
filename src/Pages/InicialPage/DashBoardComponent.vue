<template>
  <div class="container-fluid dashboard">
    <HeaderHomeComponentVue />
    <div class="row py-5">
      <!-- Pode adicionar conteúdo aqui se desejar -->
    </div>
    <div class="row">
      <div class="col-md-4">
        <PendingCard @show-modal="showModal('Pendente')" />
      </div>
      <div class="col-md-4">
        <InProgressCard @show-modal="showModal('Em Progresso')" />
      </div>
      <div class="col-md-4">
        <CompletedCard @show-modal="showModal('Concluído')" />
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="taskModalLabel">Adicionar Nova Tarefa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addTask">
              <div class="mb-3">
                <label for="taskName" class="form-label">Nome</label>
                <input type="text" class="form-control" id="taskName" v-model="newTask.name" required>
              </div>
              <div class="mb-3">
                <label for="taskDescription" class="form-label">Descrição</label>
                <textarea class="form-control" id="taskDescription" rows="3" v-model="newTask.description" required></textarea>
              </div>
              <div class="mb-3">
                <label for="taskStatus" class="form-label">Status</label>
                <select class="form-select" id="taskStatus" v-model="newTask.status" required>
                  <option value="" disabled>Escolha um status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em Progresso">Progresso</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                <i class="fas fa-plus"></i> Adicionar Tarefa
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderHomeComponentVue from "../../components/HeaderHomeComponent.vue";
import PendingCard from "../../components/PendingCard.vue";
import InProgressCard from "../../components/InProgressCard.vue";
import CompletedCard from "../../components/CompletedCard.vue";

export default {
  name: "DashBoardComponent",
  components: {
    HeaderHomeComponentVue,
    PendingCard,
    InProgressCard,
    CompletedCard
  },
  data() {
    return {
      newTask: {
        name: '',
        description: '',
        status: ''
      }
    };
  },
  methods: {
    showModal(status) {
      this.newTask.status = status;
      const modal = new window.bootstrap.Modal(document.getElementById('taskModal'));
      modal.show();
    },
    addTask() {
      // Lógica para adicionar a tarefa
      console.log(this.newTask);
      
      // Fechar o modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('taskModal'));
      modal.hide();

      // Limpar o formulário
      this.newTask = {
        name: '',
        description: '',
        status: ''
      };
    }
  }
};
</script>

<style>
html, body {
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

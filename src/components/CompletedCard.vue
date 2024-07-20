<template>
  <div class="card text-center mb-3 bg-dark text-white rounded">
    <div class="card-header text-start">
      Concluído
    </div>
    <div class="card-body">
      <p class="card-text">Tarefas que foram finalizadas.</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-light text-dark w-100 d-flex justify-content-center align-items-center" @click="$emit('show-modal')">
        <i class="fas fa-plus"></i> Adicionar Tarefa
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompletedCard'
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.card-header {
  font-weight: bold;
  background-color: #333;
  border-color: #333;
  text-align: left; /* Alinha o texto à esquerda */
}
.card-footer {
  background-color: #222;
  border-top: 1px solid #333;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn i {
  margin-right: 8px; /* Espaçamento entre o ícone e o texto */
}
</style>

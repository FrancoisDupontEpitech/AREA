<template>
    <div class="card">
      <div class="card-content">
        <div class="service">{{ item.ActionService }}</div>
        <div class="method">{{ item.ActionMethod }}</div>
        <div class="service">{{ item.ReactionService }}</div>
        <div class="method">{{ item.ReactionMethod }}</div>
      </div>
      <div class="card-footer">
        <label class="switch">
          <input type="checkbox" v-model="item.isActivated">
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </template>
  
<script>
  export default {
    props: {
      item: Object,
    },
  };
</script>
  
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-content {
text-align: center;
}

.card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
  
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}
  
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
  
.service {
  font-weight: bold;
  margin: 5px 0;
}

.method {
  margin: 5px 0;
}
</style>

  
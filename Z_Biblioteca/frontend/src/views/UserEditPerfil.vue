<template>
  <main class="main-editar-usuario">
    <div class="bloco-editar-usuario">
      <div class="bloco-editar-usuario-interno">
        <h1>Editar Perfil</h1>
        <form @submit.prevent="updateProfile">
          <!-- Renderizar a imagem de acordo com a prioridade -->
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Preview da nova foto de perfil"
            style="border-radius: 50%; width: 150px; height: 150px;"
          />
          <img
            v-else-if="imagePerfil"
            :src="formatImagePath(imagePerfil)"
            alt="Foto de perfil atual"
            style="border-radius: 50%; width: 150px; height: 150px;"
          />
          <img
            v-else
            src="@/assets/img/person.png"
            alt="Foto de perfil padrão"
            style="border-radius: 50%; width: 150px; height: 150px;"
          />

          <div>
            <span>Quer adicionar uma foto em seu perfil?</span>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              class="botao-add-img-perfil"
              @change="handleImageUpload"
            />
          </div>

          <span>Nome de usuário *</span>
          <input v-model="username" class="input" type="text" placeholder="  exemplo@exemplo.com">
          <span>E-mail *</span>
          <input v-model="email" class="input" type="text" placeholder="  exemplo@exemplo.com">
          <span>Nova senha *</span>
          <input v-model="password" class="input" type="password" placeholder="  senha@123">
          <span>Confirme a nova senha *</span>
          <input class="input" v-model="confirmPassword" type="password" placeholder="  senha@123">
          <div class="botoes">
            <button type="submit" class="botao-salvar">Salvar</button>
            <router-link to="/perfilusuario" class="botao-cancelar">Cancelar</router-link>
          </div>
        </form>
      </div>
      <div class="excluir-conta">
        <span>Deseja excluir sua conta?</span>
        <a href="./login.html">Excluir</a>
      </div>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { userService } from '@/services/api';

export default {
  data() {
    return {
      user: '', // Variável para armazenar os dados do usuário
      userId: '',
      username: '', // Nome de usuário
      email: '', // Email do usuário
      password: '', // Nova senha
      confirmPassword: '',
      imagePerfil: null, // Caminho da imagem do perfil
      imagePreview: null, // Preview para exibição local da imagem
    };
  },
  methods: {
    formatImagePath(path) {
      return path ? `http://localhost:3000/${path}` : null;
    },
    async fetchUser() {
      const userId = localStorage.getItem("userId");
      try {
        const response = await userService.getProfileById(userId);
        this.user = response.data; // Ajuste conforme o retorno da API
        this.username = this.user.username;
        this.email = this.user.email;
        this.imagePerfil = this.user.imagePerfil; // Caminho da imagem, se existir
      } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePerfil = file; // Atualiza com o arquivo real
        this.imagePreview = URL.createObjectURL(file); // Gera o preview
      }
    },
    async updateProfile() {
      if (this.password && this.password !== this.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      const userId = localStorage.getItem('userId');
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('email', this.email);
      if (this.password) {
        formData.append('password', this.password);
      }
      if (this.imagePerfil) {
        formData.append('imagePerfil', this.imagePerfil);
      }


      try {
        await axios.put(`http://localhost:3000/api/user/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Perfil atualizado com sucesso!');
        this.fetchUser();
        this.$router.push('/perfilusuario');
      } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('Ocorreu um erro ao atualizar o perfil.');
        }
      }
    },
  
  },
  mounted() {
    this.fetchUser();
  },
};
</script>


<style scoped>
/* ########################################### */
/* ########## MAIN - EDITAR PERFIL.HTML ########## */
.main-editar-usuario {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bloco-editar-usuario {
  width: 1072px;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
} 

.bloco-editar-usuario-interno {
  width: 392px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
}

.bloco-editar-usuario-interno h1 {
  font-size: 30px;
  font-weight: bold;
  color: #0C8CE9;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  margin-top: 20px;
}

.bloco-editar-usuario-interno form {
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bloco-editar-usuario-interno span {
  font-size: 18px;
  margin: 0;
  padding: 0;
  display: block;
  width: 324px;
  margin-top: 15px;
}

.bloco-editar-usuario-interno .input {
  width: 324px;
  height: 47px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
  background-color: #E7E7E7;
  padding: 0;
  margin: 0;
}

.bloco-editar-usuario-interno .botoes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 324px;
  justify-content: space-between;
}

.bloco-editar-usuario-interno .botao-salvar {
  width: 150px;
  height: 47px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  background-color: #0C8CE9;
  color: #fff;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  margin-top: 15px;
  margin-bottom: 15px;
}

.bloco-editar-usuario-interno button:hover {
  background-color: #fff;
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}

.bloco-editar-usuario-interno .botao-cancelar {
  width: 150px;
  height: 47px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  background-color: #fff;
  color: #0C8CE9;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  margin-top: 15px;
  margin-bottom: 30px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bloco-editar-usuario-interno .botao-cancelar:hover {
  background-color: #eef5fa;
  color: #0C8CE9;

}

.excluir-conta {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 21px;
  align-items: center;
  gap: 21px;
}

.excluir-conta a {
  width: 127px;
  height: 30px;
  background-color: #e91717;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.excluir-conta a:hover {
  background-color: #ff0000;
  color: #fff;
}

.bloco-editar-usuario-interno .add-img-perfil {
  width: 20px;
  height: 20px;
}

.bloco-editar-usuario-interno .botao-add-img-perfil {
  height: 21px;
  width: 324px;  
}
</style>
import axios from 'axios'; // Importa Axios para requisições HTTP

// Cria instância do Axios para gerenciamento de livros
const booksApiClient = axios.create({
    baseURL: 'http://localhost:3000/api/books', // API para livros
    headers: {
        'Content-Type': 'application/json',
    },
});

// Cria instância do Axios para login e outras rotas gerais
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // API para login/usuários
    headers: {
        'Content-Type': 'application/json',
    },
});

// Cria instância do Axios para gerenciamento de livros
const notifApiClient = axios.create({
    baseURL: 'http://localhost:3000/api/generalnotifications', // API para livros
    headers: {
        'Content-Type': 'application/json',
    },
});


// Adiciona interceptores a ambas as instâncias para enviar token JWT
const attachInterceptor = (client) => {
    client.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};

attachInterceptor(booksApiClient);
attachInterceptor(apiClient);

// Exporta funções CRUD para livros
export const booksService = {
    getBooks() {
        return booksApiClient.get('/'); // Obtém todos os livros
    },
    addBook(book) {
        return booksApiClient.post('/', book); // Adiciona um novo livro
    },
    updateBook(id, book) {
        return booksApiClient.put(`/${id}`, book); // Atualiza um livro existente
    },
    deleteBook(id) {
        return booksApiClient.delete(`/${id}`); // Deleta um livro pelo ID
    },
    fetchBookById(id) {
        console.log(`Buscando livro com ID: ${id}`);
        return booksApiClient.get(`/${id}`).then(response => response.data);
    }
};

// Exporta funções relacionadas ao usuário/login
export const userService = {
    login(credentials) {
        return apiClient.post('/auth/login', credentials); // Realiza login
    },
    register(userData) {
        return apiClient.post('/auth/register', userData); // Registra um novo usuário
    },
    getProfile() {
        return apiClient.get('/auth/profile'); // Obtém perfil do usuário
    },
    getProfileById(id) {
        return apiClient.get(`/auth/${id}`); // Obtém perfil do usuário por ID
    },
    postCart(id, data) {
        return apiClient.post(`/auth/${id}/carrinho`, data); // Obtém perfil do usuário por ID
    },
    postReservations(id, data) {
        return apiClient.post(`/auth/${id}/reservas`, data); // Obtém perfil do usuário por ID
    }
};

export const generalNotif = {
    getNotifGeral() {
      return notifApiClient.get('/');
    },
    notifgeralPost(data) {
      return notifApiClient.post('/', data);
    },
  }

// Exporta os clientes de API para uso em outros módulos
export { booksApiClient, apiClient };

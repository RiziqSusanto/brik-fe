import axios from "../../utils/axios";

const todos = {
    all: (options = { params: {} }) => axios.get(`/todos`, options).then((res) => res),
    details: (id) => axios.get(`/todos/${id}`).then((res) => res),
}

export default todos

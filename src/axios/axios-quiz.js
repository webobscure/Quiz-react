import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-react-f8b0b-default-rtdb.europe-west1.firebasedatabase.app/'
})
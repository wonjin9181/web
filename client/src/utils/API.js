import axios from "axios";

export default {
  getMonsters: () => {
    return axios.get("/api/monsters");
  },

  getOneMonster: (id) => {

    // console.log('ID????', id);

    return axios.get("/api/monsters/" + id)
  },





  loginUser: (data) => {
    // console.log("this: " + data)
    return axios.post("/api/login", data)
  },

  createUser: (userData) => {

    // console.log("this: " + userData)

    return axios.post("/api/users", userData)
  },

  loadUser: (userData) => {
    // console.log("this: " + userData)
    let rval = axios.get("/api/users/" + userData)
    return rval;
  },

  updateUser: (userData, id) => {
    // console.log(userData)
    return axios.put("/api/users/" + id, userData)
  },

  updateStrength: (userData, id) => {
    // console.log(userData, id)
    return axios.put("/api/users/strength/" + id, userData)
  },

  deleteUser: (id) => {
    // console.log(id)
    return axios.delete("/api/users/" + id)
  },

  deleteHouseUser: (id) => {
    // console.log(id)
    return axios.delete("/api/house/users/" + id)
  },





  getHouseMembers: (data) => {
    return axios.get("/api/house/" + data)
  },


  postHouse: (userData) => {
    return axios.post("/api/house", userData)
  }

}

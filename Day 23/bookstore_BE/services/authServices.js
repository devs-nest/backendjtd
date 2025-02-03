
const pool = require("../db")


const register = async (data) => {

    const user = await pool.query(
      "INSERT INTO users ( name, email, password, role) VALUES ($1, $2, $3, $4)",
      [data.name, data.email, data.password, data.role]
    );
    return user
  };


const login = async (data) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [data.email]
    );
    return result
};

const createCategory = async (id) => {
    
};

const getPostsWithCategory = async(categoryName,createdAt) =>{
   
      
}


module.exports = {
  login,
  register
};

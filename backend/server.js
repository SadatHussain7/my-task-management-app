require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
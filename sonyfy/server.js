require('dotenv').config(); 
const app = require("./app/configs/app.conf");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

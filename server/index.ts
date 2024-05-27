import app from "./src/app";
import { PORT } from "./src/config/config";
export const baseUrl = "https://gc-webathon-2024.onrender.com";
const port = PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import express from "express";

import { appointmentRoutes } from "./routes/appointment.routes.js";

const app = express();

const port = 3333;

app.use(express.json());

app.use("/appointments", appointmentRoutes);

app.get("/", (request, response) => {
  return response.json({
    message: "API da barbearia funcionand",
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

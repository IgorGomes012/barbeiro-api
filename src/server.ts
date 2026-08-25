import express from "express";

const app = express();
app.use(express.json());

interface Appointment {
  id: string;
  clientName: string;
  clientNumber: string;
  service: string;
  date: string;
  time: string;
}

const appointments: Appointment[] = [];

const port = 3333;

app.get("/appointments", (request, response) => {
  return response.json(appointments);
});

app.get("/", (request, response) => {
  return response.json({
    message: "API da barbearia funcionando",
  });
});

app.post("/appointments", (request, response) => {
  const { clientName, clientNumber, service, date, time } = request.body;

  if (!service || !date || !time || !clientName || !clientNumber) {
    return response.status(400).json({
      message: "Todos os campos são obrigatórios",
    });
  }

  const isTimeOccupied = appointments.some(
    (appointment) => appointment.date === date && appointment.time === time,
  );

  if (isTimeOccupied) {
    return response.status(409).json({
      message: "Este horário já está ocupado.",
    });
  }

  const newAppointment: Appointment = {
    id: crypto.randomUUID(),
    clientName,
    clientNumber,
    service,
    date,
    time,
  };

  appointments.push(newAppointment);

  return response.status(201).json({
    message: "Agendamento criado com sucesso",
    appointment: newAppointment,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

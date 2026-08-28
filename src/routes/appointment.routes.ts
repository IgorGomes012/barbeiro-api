import { Router } from "express";

interface Appointment {
  id: string;
  clientName: string;
  clientNumber: string;
  service: string;
  date: string;
  time: string;
}

let appointments: Appointment[] = [];

const appointmentRoutes = Router();

appointmentRoutes.get("/", (request, response) => {
  return response.json(appointments);
});

appointmentRoutes.post("/", (request, response) => {
  const { clientName, clientNumber, service, date, time } = request.body;

  if (!service || !date || !time || !clientName || !clientNumber) {
    return response.status(400).json({
      message: "Todos os campos são obrigatórioss",
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

appointmentRoutes.delete("/:id", (request, response) => {
  const { id } = request.params;

  // excluir aqui
});

export { appointmentRoutes };

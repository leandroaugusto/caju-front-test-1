import axios from "axios";

import type { TRegistrationsData } from "~/types/registrations.types";

const baseUrl = "http://localhost:3000";
const path = "registrations";

export async function fetchAllRegistrations() {
  const { data } = await axios.get(`${baseUrl}/${path}`);
  return data;
}

export async function fetchRegistrationByCPF(cpf: string) {
  const { data } = await axios.get(`${baseUrl}/${path}?cpf=${cpf}`);
  return data;
}

export async function saveRegistration(params: Partial<TRegistrationsData>) {
  const { data } = await axios.post(`${baseUrl}/${path}`, params);
  return data;
}

export async function deleteRegistration(id: string) {
  const { data } = await axios.delete(`${baseUrl}/${path}/${id}`);
  return data;
}

export async function reviewRegistration(params: Partial<TRegistrationsData>) {
  const { data } = await axios.patch(`${baseUrl}/${path}/${params.id}`, params);
  return data;
}
import axios from "axios";

import type { TRegistrationsData } from "~/types/registrations.types";

import { serverHost as baseUrl, queryKey as path } from "~/constants"

export async function fetchAllRegistrations({ page = 0, limit = 10 }: { page?: number; limit?: number }) {
  const { data } = await axios.get(`${baseUrl}/${path}?_page=${page}&_per_page=${limit}`);
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
  const { data } = await axios.put(`${baseUrl}/${path}/${params.id}`, params);
  return data;
}

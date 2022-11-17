import axios from "axios";
import http from "../http-common";


export const getAllTasks = () => {
		return http.get("/findAll");
	}

export const getTask = (id) => {
	return http.get(`/${id}`);
}

export const createTask = (data) => {
	return http.post("/create",data);
}

export const updateTask =(id, data) => {
	console.log("sending",data);
	return http.put(`/${id}`, data);
}

export const deleteTask = (id) => {
	return http.delete(`/${id}`);
}

export const deleteAllTasks = () => {
	return http.delete(`/`);
}

export const findTaskByTitle = (title) => {
	return http.get(`/findAll?title=${title}`);
}
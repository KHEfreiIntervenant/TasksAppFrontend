import React, { useEffect, useState } from 'react';
import {getAllTasks,deleteAllTasks,findTaskByTitle} from "../services/task.service";
import { Link } from "react-router-dom";

export const TasksList= (props) => {


	useEffect(() => {
		retrieveTasks();
	  }, []);

	const [searchTitle, setSearchTitle] = useState("");
	const [tasks, setTasks] = useState([]);
	const [currentTask, setCurrentTask] = useState({
		index:0,
		title:"",
		description:""
	});

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	}

	const retrieveTasks = () => {
		getAllTasks()
			.then((response) => {
				console.log(response.data);
				setTasks(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const refreshList = () => {
		retrieveTasks();
		setCurrentTask({
			title: "",
			description: "",
			index: -1,
		});
	}

	const setActiveTask = (task, index) => {
		console.log("setting",task)
		setCurrentTask(
			{...task,index});
	}

	const removeAllTasks = () => {
		deleteAllTasks()
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const doSearchTitle = () => {
		setCurrentTask({
			task: null,
			index: -1,
		});

		findTaskByTitle(searchTitle)
			.then((response) => {
				setTasks(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

		return (
			<div className="list row">
				<div className="col-md-8">
					<div
						style={{
							backgroundColor: "#3c5176",
							padding: "20px 50px",
							marginBottom: "40px",
							borderRadius: "5px",
						}}
					>
						<h1
							style={{
								textAlign: "center",
								padding: "50px 0",
								color: "#cbce51",
							}}
						>
							Task Manager
						</h1>
						<p style={{ textAlign: "justify", color: "#fff" }}>
							This is a sample application for task management,
							designed for the course of Software Development for
							Managers, at Efrei Paris. It serves to provide a
							running example of a full-stack application,
							including a Frontend, a Backend, a database and
							RESTful communication.
						</p>
					</div>
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Search by title"
							value={searchTitle}
							onChange={onChangeSearchTitle}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={doSearchTitle}
							>
								Search
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<h4>Tasks List</h4>

					<ul className="list-group">
						{tasks &&
							tasks.map((_task, _index) => (
								<li
									className={
										"list-group-item " +
										(_index === currentTask.index ? "active" : "")
									}
									data-index={_index}
									onClick={() =>
										setActiveTask(_task, _index)
									}
									key={_index}
								>
									{_task.title}
								</li>
							))}
					</ul>

					<button
						className="m-3 btn btn-sm btn-danger"
						onClick={removeAllTasks}
					>
						Remove All
					</button>
				</div>
				<div className="col-md-6">
					{currentTask.index ? (
						<div>
							<h4>Task</h4>
							<div>
								<label>
									<strong>Title:</strong>
								</label>{" "}
								{currentTask.title}
							</div>
							<div>
								<label>
									<strong>Description:</strong>
								</label>{" "}
								{currentTask.description}
							</div>
							<div>
								<label>
									<strong>Status:</strong>
								</label>{" "}
								{currentTask.published
									? "Published"
									: "Pending"}
							</div>
							<button className="edit-link">
							<Link
								to={"/tasks/" + currentTask.id}
								className="badge badge-warning"
								id="edit-task"
							>
								Edit
							</Link>
							</button>
						</div>
					) : (
						<div>
							<br />
							<p>Please click on a Task...</p>
						</div>
					)}
				</div>
			</div>
		);
	}


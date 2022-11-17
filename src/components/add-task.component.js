import React, { useState } from "react";
import {createTask} from "../services/task.service";


export const AddTask = (  ) => {
	const [state, setState] = useState({
		id: null,
		title: "",
		description: "",
		published: false,
		submitted: false,
	});

	
const handleSubmit = () => {
	let data = {
		title: state.title,
		description: state.description,
	};
	createTask(data)
		.then((response) => {
			setState({
				id: response.data.id,
				title: response.data.title,
				description: response.data.description,
				published: response.data.published,

				submitted: true,
			});
			console.log(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
};

	

	const saveTask = (e) => {
		e.preventDefault();
		handleSubmit();
	};
	const onChangeTitle = (e) => {
		setState({ ...state, title: e.target.value });
	};

	const onChangeDescription = (e) => {
		setState({ ...state, description: e.target.value });
	};

	const newTask = () => {
		setState({
			id: null,
			title: "",
			description: "",
			published: false,

			submitted: false,
		});
	};

	return (
		<div className="submit-form">
			{state.submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className="btn btn-success" onClick={newTask}>
						Add
					</button>
				</div>
			) : (
				<form id="add-task-form" onSubmit={saveTask}>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							className="form-control"
							id="title"
							required
							value={state.title}
							onChange={onChangeTitle}
							name="title"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							className="form-control"
							id="description"
							required
							value={state.description}
							onChange={onChangeDescription}
							name="description"
						/>
					</div>

					<button type="submit" className="btn btn-success">
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

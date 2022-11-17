import React,  { useEffect, useState } from "react";
import {getTask,updateTask,deleteTask} from "../services/task.service";
import { useParams, useNavigate } from "react-router-dom";

export const Task = (props) => {

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
		getTask(id)
      .then(response => {
        setCurrentTask(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
	  }, []);

    
	const [currentTask, setCurrentTask] = useState({
    id: null,
    title: "",
    description: "",
    published: false
  });
	const [message, setMessage] = useState("");
 

  const onChangeTitle = (e)=> {
    const title = e.target.value;

    setCurrentTask({
        ...currentTask,
        title: title
    })
  }

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTask({
      ...currentTask,
      description: description
    })
  }

  const updatePublished = (status) => {
    var data = {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      published: status
    };

    updateTask(currentTask.id, data)
      .then(response => {
        setCurrentTask({
          ...currentTask,
            published: status
          }
        );
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleTaskUpdate = () => {
    
    updateTask(
      currentTask.id,
      currentTask
    )
      .then(response => {
        console.log(response.data);
        setMessage(
          "The task was updated successfully!"
        );
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleTaskDelete = () => {    
    deleteTask(currentTask.id)
      .then(response => {
        console.log(response.data);
        navigate('/tasks')
      })
      .catch(e => {
        console.log(e);
      });
  }


    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTask.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2 edit-link"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2 edit-link"
              onClick={handleTaskDelete}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={handleTaskUpdate}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
}

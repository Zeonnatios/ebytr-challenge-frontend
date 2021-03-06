import React, { useContext } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Context from '../../context/Context';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';

function Table() {
  const {
    tasks,
    excludeTaskById,
    setActionButton,
    setInputTask,
    getTaskById,
    sortAlphabeticalAsc,
    sortByCreatedDateAsc,
    sortByStatusAsc,
    sortAlphabeticalDesc,
    sortByCreatedDateDesc,
    sortByStatusDesc,
  } = useContext(Context);

  const setTaskToEdit = (id) => {
    const data = getTaskById(id);
    setInputTask(data);
    setActionButton({ create: false, edit: true });
  };

  const renderThead = () => (
    <thead className="thead">
      <tr>
        <th>
          <FaCaretUp className="sort-Button" onClick={sortAlphabeticalDesc} />
          Tarefa
          <FaCaretDown className="sort-Button" onClick={sortAlphabeticalAsc} />
        </th>
        <th>Descrição</th>
        <th>
          <FaCaretUp className="sort-Button" onClick={sortByStatusDesc} />
          Status
          <FaCaretDown className="sort-Button" onClick={sortByStatusAsc} />
        </th>
        <th>
          <FaCaretUp className="sort-Button" onClick={sortByCreatedDateDesc} />
          Data de Criação
          <FaCaretDown className="sort-Button" onClick={sortByCreatedDateAsc} />
        </th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
  );

  const getTimeUnit = (unit) => {
    const limit = 10;
    return unit < limit ? `0${unit}` : unit;
  };

  const renderDate = (date) => {
    const rawDate = new Date(date);
    const day = rawDate.getDate();
    const mounth = rawDate.getMonth() + 1;
    const year = rawDate.getFullYear();
    const hours = getTimeUnit(rawDate.getHours());
    const minutes = getTimeUnit(rawDate.getMinutes());
    const parseDate = `${day}/${mounth}/${year} ${hours}:${minutes}`;
    return parseDate;
  };

  const renderTbody = () => (
    <tbody className="tbody">
      {tasks.map((t) => {
        const {
          _id, task, description, status, createdDate,
        } = t;
        const parsedDate = renderDate(createdDate);
        return (
          <tr key={_id}>
            <td data-testid="data-task">{task}</td>
            <td data-testid="data-description">{description}</td>
            <td data-testid="data-status">{status}</td>
            <td data-testid="data-createdDate">{parsedDate}</td>
            <td>
              <div className="action-buttons">
                <button
                  type="button"
                  onClick={() => setTaskToEdit(_id)}
                  data-testid="data-button-edit"
                >
                  <img src={editImg} alt="edit button" />
                </button>
                <button
                  type="button"
                  onClick={() => excludeTaskById(_id)}
                  data-testid="data-button-delete"
                >
                  <img src={deleteImg} alt="exclude button" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  const renderLoading = () => (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary" role="status" />
    </div>
  );

  if (!tasks.length > 0) {
    return renderLoading();
  }

  return (
    <table className="table">
      {renderThead()}
      {renderTbody()}
    </table>
  );
}

export default Table;

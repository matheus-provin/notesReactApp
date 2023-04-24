import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import useAuth from "./hooks/useAuth";

const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,     
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    const { signout } = useAuth();
    const navigate = useNavigate();
  
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>Notas</h1>
          <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
          <button onClick={onAddNote}>Adicionar</button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <button onClick={(e) => onDeleteNote(id)}>Excluir</button>
              </div>
  
              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                Ultima modificação:{" "}
                {new Date(lastModified).toLocaleDateString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default Sidebar;
  
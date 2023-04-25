import { useContext, useEffect, useState} from "react";
import uuid from "react-uuid";
import "../../App.css";
import Main from "../../Main";
import Sidebar from "../../Sidebar";
import { AuthContext } from "../../Auth";
import { useParams } from "react-router-dom";
import useAuth  from "../../hooks/useAuth";


function Notes() {

    


    const {user, setUserNotes} = useAuth()
    const [notes, setNotes] = useState(
      localStorage.getItem(`${user.email}_notes`) ? JSON.parse(localStorage.getItem(`${user.email}_notes`)) : []
    );
    useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await localStorage.getItem(`${user.email}_notes`);
        const notes = response.data.notes;
        setUserNotes(notes);
      } catch (error) {
        console.error("Erro ao buscar as notas do usuário", error);
      }
    };

    fetchUserNotes();
  }, []);
    
    useEffect(() => {
      const storedNotes = JSON.parse(localStorage.getItem(`${user.email}_notes`)) || [];
      setNotes(storedNotes);
    }, [user]);
    function saveNotesToStorage(notes) {
      localStorage.setItem(`${user.email}_notes`, JSON.stringify(notes));
      
    }
    useEffect(() => {
      saveNotesToStorage(notes);
    }, [notes, user]);
    
    
      const [activeNote, setActiveNote] = useState(false);
    
      const onAddNote = () => {

        const newNote = {
          id: `${uuid()}-${user.email}`,
          title: "Nota sem título",
          body: "",
          lastModified: Date.now(),
        };
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);
        setActiveNote(newNote.id);
        console.log(user.email)

      };
    
      const onDeleteNote = (noteId) => {
        const updatedNotes  = notes.filter(({ id }) => id !== noteId);
        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);
       
      };
    
      const onUpdateNote = (updatedNote) => {
        const updatedNotes = notes.map((note) => {
          if (note.id === updatedNote.id) {
             return { ...note, ...updatedNote };
          }
          return note;
        });
        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);
       
      };
      
      const getActiveNote = () => {
        return notes.find(({ id }) => id === activeNote);
    
      }
    
    return(
        <div className="notes">
            <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
                  />
                  <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
                  
                  
        </div>
    )
}

export default Notes

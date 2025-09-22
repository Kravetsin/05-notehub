import css from "./NoteList.module.css";
import { type Note } from "../../types/note";

type NoteListProps = {
  notes: Note[];
  onDeleteNote: (id: string) => void;
};

export default function NoteList({ notes, onDeleteNote }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((item) => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button
              onClick={() => onDeleteNote(item.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

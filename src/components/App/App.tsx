import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <NoteList />
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}

export default App;

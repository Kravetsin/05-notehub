import { useState, useEffect } from "react";
import css from "./App.module.css";
import styles from "../Pagination/Pagination.module.css";
import NoteList from "../NoteList/NoteList";
import ReactPaginate from "react-paginate";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import { useFetchNotes } from "../../services/noteService";
import toast, { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const [text, setText] = useState("");

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    300
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [text]);

  const { data, isSuccess } = useFetchNotes(currentPage, text);

  useEffect(() => {
    if (
      isSuccess &&
      data &&
      Array.isArray(data.notes) &&
      data.notes.length === 0
    ) {
      toast.error("No notes found.");
    }
  }, [isSuccess, data]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <ReactPaginate
            pageCount={data.totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {data && Array.isArray(data.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isModalOpen && <Modal onClose={closeModal} />}

      <Toaster />
    </div>
  );
}

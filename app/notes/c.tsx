'use client'


import css from "./notesPage.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query"; 
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../lib/api";

import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

export default function NotesClient() {
        const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    const {
        data: notesData,
    } = useQuery({
        queryKey: ["notes", page, debouncedQuery],
        queryFn: () => fetchNotes({ page, search: debouncedQuery }),
        placeholderData: keepPreviousData, 
    });

    const handlePageClick = (event: { selected: number }): void => {
        setPage(event.selected + 1);
    };

    const openModal = (): void => setIsModalOpen(true);
    const closeModal = (): void => setIsModalOpen(false);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchQuery} onChange={setSearchQuery} />
                {notesData && notesData.totalPages > 1 && (
                    <Pagination
                        pageCount={notesData.totalPages}
                        currentPage={page}
                        onPageChange={handlePageClick}
                    />
                )}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>

            <main>
                {notesData && notesData.notes.length > 0 && (
                    <NoteList
                        notes={notesData.notes}
                    />
                )}
            </main>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <NoteForm onCancel={closeModal} />
            </Modal>
        </div>
    );
}
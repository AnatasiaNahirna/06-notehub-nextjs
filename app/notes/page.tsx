import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotesClient from "./c";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['notes', { page: 1, search: "" }],
        queryFn: ()=>fetchNotes({}),
    });

    return (
        <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient/>
            </HydrationBoundary>
        </div>
    )
}
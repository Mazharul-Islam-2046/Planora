"use client";
import { useGetUsersQuery } from "@/api/userApi";
import { AuthenticationDialog } from "@/components/ui/AuthenticationDialog";
import TodoForm from "@/components/ui/TodoForm";

export default function Home() {

  const { data, error, isLoading } = useGetUsersQuery();


  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-12 py-28">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-6xl font-semibold">Planora</h1>
          <p>An open source project for Managing your team&apos;s projects</p>
        </div>
        <AuthenticationDialog />
        <TodoForm/>
        <h3>Todo List</h3>
        <p>{isLoading ? "Loading..." : "See Below"}</p>
        <p>{error ? "Error" : "All is well"}</p>
        <li>
          {
            data?.map((user, idx) => (
              <ul key={idx}>{user.email}</ul>
            ))
          }
        </li>
      </div>
    </>
  );
}

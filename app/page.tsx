"use client";
import { useGetUsersQuery } from "@/api/userApi";
import { AuthenticationDialog } from "@/components/ui/AuthenticationDialog";
import TodoForm from "@/components/ui/TodoForm";
import { Delete } from "lucide-react";
import { deleteUserAction } from "./actions/user";

export default function Home() {

  const { data, error, isLoading, refetch } = useGetUsersQuery();
  const handleDelete = async (id: string) => {
    const res = await deleteUserAction(id);
    if (res.status === 200) {
      console.log("User Deleted Successfuly")
      refetch();
    }
  }


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
        <ul style={{ listStyleType: "disc" }}>
          {
            data?.map((user, idx) => (
              <div className="flex items-center gap-3" key={idx}>
                <li>{user.email}</li>
                <button onClick={() => handleDelete(user.id)}><Delete/></button>
              </div>
            ))
          }
        </ul>
      </div>
    </>
  );
}

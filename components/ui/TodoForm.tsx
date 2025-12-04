"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, FieldDescription } from "./field";
import { Button } from "./button";
import { useCreateUserMutation } from "@/api/userApi";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});
const TodoForm = () => {
  // Initialize form correctly
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const [open, setOpen] = useState(false);

  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  const handleSaveUser = async (values: z.infer<typeof formSchema>) => {
    try {
      await createUser(values).unwrap();
      if (isSuccess) {
        setOpen(false);
      }
      if (isError) {
        console.log(error)
      }
      form.reset();
      console.log(values);
      console.log("user created successfully!");
      console.log(isSuccess)
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">Open Todo Form</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-6 py-4"
            onSubmit={form.handleSubmit(handleSaveUser)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Field>
                <Button type="submit">{isLoading ? "Loading" : "Save User"}</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;

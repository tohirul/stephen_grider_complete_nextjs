"use client";
import HydrationWrapper from "@/utilities/HydrationWrapper";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import React, { useActionState } from "react";
import FormButton from "../common/FormButton";
import { createPost } from "@/actions";

interface PostCreateFormProps {
  slug: string;
}

function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, createPostAction] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {},
    }
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button>Create a post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={createPostAction}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a post</h3>
            <Input
              name="post_title"
              label="Title"
              placeholder="Title"
              labelPlacement="outside"
              isInvalid={!!formState.errors?.post_title}
              errorMessage={formState.errors?.post_title?.join(", ")}
            />
            <Textarea
              name="post_content"
              label="Content"
              placeholder="Content"
              labelPlacement="outside"
              isInvalid={!!formState.errors?.post_content}
              errorMessage={formState.errors?.post_content?.join(", ")}
            />
            {formState.errors?._form?.map((error) => (
              <p key={error} className="text-red-500">
                {error}
              </p>
            ))}
            <FormButton>Create</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default PostCreateForm;

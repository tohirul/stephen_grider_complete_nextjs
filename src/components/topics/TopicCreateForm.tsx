"use client";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Textarea,
  Input,
} from "@nextui-org/react";
import { useActionState } from "react";
import { createTopic } from "@/actions";
import FormButton from "@/components/common/FormButton";

export default function TopicCreateForm() {
  const [formState, topicFormAction] = useActionState(createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="success" variant="bordered">
          Create Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={topicFormAction}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              label="name"
              name="topic_name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors?.topic_name}
              errorMessage={formState.errors?.topic_name?.join(", ")}
            />
            <Textarea
              label="description"
              name="topic_description"
              labelPlacement="outside"
              placeholder="Describe your topics..."
              isInvalid={!!formState.errors?.topic_description}
              errorMessage={formState.errors?.topic_description?.join(", ")}
            />
            {formState.errors?._form && (
              <p className="text-red-500">
                {formState.errors._form?.join(", ")}
              </p>
            )}
            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

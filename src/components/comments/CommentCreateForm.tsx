"use client";

import { Button, Textarea } from "@nextui-org/react";
import React, { useActionState, useEffect, useRef, useState } from "react";
import FormButton from "../common/FormButton";
import { createComment } from "@/actions";
import HydrationWrapper from "@/utilities/HydrationWrapper";
import { CommentCreateFormProps } from "@/types/CommentType";

const CommentCreateForm: React.FC<CommentCreateFormProps> = ({
  postId,
  parentId,
  startOpen = false,
}) => {
  const [open, setOpen] = useState(startOpen);
  const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({});
  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, createCommentAction] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  // Handle input changes and clear errors if needed
  const handleInputChange = () => {
    if (localErrors.content || localErrors._form) {
      setLocalErrors({});
    }
  };

  // Handle form state updates
  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
      if (!startOpen) setOpen(false);
      setLocalErrors({});
    } else if (formState.errors) {
      setLocalErrors(formState.errors);
    }
  }, [formState, startOpen]);

  return (
    <HydrationWrapper>
      <div>
        {!open ? (
          <Button
            type="button"
            color="primary"
            variant="flat"
            className="font-bold"
            onPress={() => setOpen(true)}
          >
            Write a comment
          </Button>
        ) : (
          <form action={createCommentAction} ref={ref}>
            <div className="space-y-2 px-1 py-4">
              <Textarea
                name="content"
                label="Reply"
                placeholder="Write here..."
                labelPlacement="inside"
                isInvalid={!!localErrors.content}
                errorMessage={localErrors.content?.join(", ")}
                onChange={handleInputChange}
              />

              {localErrors._form && (
                <div className="bg-red-200 p-2 border border-red-400 rounded">
                  {localErrors._form.join(", ")}
                </div>
              )}

              <div className="flex gap-2">
                <FormButton>Create Comment</FormButton>
                <Button
                  type="button"
                  variant="flat"
                  color="danger"
                  className="font-bold"
                  onPress={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </HydrationWrapper>
  );
};

export default React.memo(CommentCreateForm);

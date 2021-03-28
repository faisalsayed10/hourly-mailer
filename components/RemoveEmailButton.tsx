import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { mutate } from "swr";
import { useUser } from "hooks";
import axios from "axios";

interface Props {
  listId: string;
  emailId: string;
}

const RemoveButton: React.FC<Props> = ({ listId, emailId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { user } = useUser();

  const onDelete = async () => {   
    await axios.delete(`/api/list/${listId}/${emailId}`)

    // mutate(
    //   ["/api/feedback", user.id],
    //   async (data) => {
    //     return {
    //       feedback: data.feedback.filter(
    //         (feedback) => feedback.id !== feedbackId
    //       ),
    //     };
    //   },
    //   false
    // );
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete Feedback"
        icon={<DeleteIcon color='red.600' />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Email
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default RemoveButton;

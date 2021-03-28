import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { mutate } from "swr";
import { useUser } from "hooks";
import axios from "axios";

interface Props {
  listId: string;
}

const RemoveListButton: React.FC<Props> = ({ listId, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const [isLargerThan500] = useMediaQuery("(min-width: 510px)");
  const { user } = useUser();

  const onDelete = async () => {
    await axios.delete(`/api/list/${listId}`);

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
      {isLargerThan500 ? (
        <Button
          aria-label="Delete Feedback"
          leftIcon={<DeleteIcon />}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "gray.700" }}
          _active={{ bg: "gray.800", transform: "scale(0.95)" }}
          onClick={() => setIsOpen(true)}
        >
          {children}
        </Button>
      ) : (
        <IconButton
          aria-label="Delete Feedback"
          icon={<DeleteIcon />}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "gray.700" }}
          _active={{ bg: "gray.800", transform: "scale(0.95)" }}
          onClick={() => setIsOpen(true)}
        />
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete List
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
};

export default RemoveListButton;

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useUser } from "hooks";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

interface Props {
  listId: string;
}

const AddEmailModal: React.FC<Props> = ({ children, listId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleSubmit, register } = useForm();
  const { user } = useUser();
  const { data } = useSWR("/api/list");

  const onCreate = async ({ addresses }) => {
    const newEmail = { addresses, listId };
    const { data } = await axios.post("/api/email", newEmail);
    toast({
      title: "Success!",
      description: "Emails added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // mutate(
    //   ["/api/lists", user.id],
    //   async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
    //   false
    // );
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.800", transform: "scale(0.95)" }}
        mx="2"
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal size="xl" isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreate)}>
          <ModalHeader fontWeight="bold">Add Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Comma Separated Email Addresses</FormLabel>
              <Textarea
                placeholder="johndoe@example.com, janedoe@example.com"
                name="addresses"
                ref={register({ required: "Required" })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#194D4C" type="submit">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmailModal;

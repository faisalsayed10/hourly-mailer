import { List } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useUser } from "hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

interface Props {}

const AddListModal: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleSubmit, register } = useForm();
  const { user } = useUser();

  const onCreate = async ({ name }) => {
    try {
      const res = await axios.post("/api/list", { name });
      toast({
        title: "Success!",
        description: "List created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      mutate(["/api/list", user?.id], async (data: List[]) => [...data, res.data], false);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        Create A List
      </Button>
      <Modal size="xl" isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreate)}>
          <ModalHeader fontWeight="bold">Create A List</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>List Name</FormLabel>
              <Input
                placeholder="My new list"
                name="name"
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

export default AddListModal;

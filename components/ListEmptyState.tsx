import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import AddEmailModal from "./AddEmailModal";

interface Props {
  listId: string;
}

const ListEmptyState: React.FC<Props> = ({ listId }) => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      p={16}
      borderRadius="8px"
      justify="center"
      direction="column"
      align="center"
    >
      <Text fontSize={["xl", "xl", "3xl"]} align="center" fontWeight="500" mb={6}>
        You haven't added any emails.
      </Text>
      <AddEmailModal listId={listId}>Start Adding Emails</AddEmailModal>
    </Flex>
  );
};

export default ListEmptyState;

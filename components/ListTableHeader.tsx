import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import React from "react";
import AddEmailModal from "./AddEmailModal";
import RemoveListButton from "./RemoveListButton";

interface Props {
  name: string;
  listId: string;
}

const ListTableHeader: React.FC<Props> = ({ name, listId }) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 510px)")

  return (
    <>
      <Flex justifyContent="space-between" mb="4">
        <Text fontSize="2xl" align="center" color="black">
          {name}
        </Text>
        <Box>
          <AddEmailModal listId={listId}>
            + {isLargerThan500 ? "Add Emails" : null}
          </AddEmailModal>
          <RemoveListButton listId={listId}>
            {isLargerThan500 ? "Delete List" : null}
          </RemoveListButton>
        </Box>
      </Flex>
    </>
  );
};

export default ListTableHeader;

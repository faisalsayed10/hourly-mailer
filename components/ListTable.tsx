import { Box } from "@chakra-ui/layout";
import { Email } from "@prisma/client";
import React from "react";
import RemoveButton from "./RemoveEmailButton";
import { Table, Td, Th, Tr } from "./Table";
interface Props {
  emails: Email[];
  listId: string;
}

const ListTable: React.FC<Props> = ({ emails, listId }) => {
  return (
    <Box overflowX="auto">
       {/* @ts-ignore */}
      <Table w="full">
        <thead>
          <Tr>
            <Th>No.</Th>
            <Th>Emails</Th>
            <Th>Status</Th>
            <Th>Delete</Th>
          </Tr>
        </thead>
        <tbody>
          {emails.map((email, idx) => (
            <Box as="tr" key={email.id}>
              <Td>{idx + 1}.</Td>
              <Td>{email.address}</Td>
              <Td>{JSON.stringify(email.response)}</Td>
              <Td>
                <RemoveButton listId={listId} emailId={email.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ListTable;

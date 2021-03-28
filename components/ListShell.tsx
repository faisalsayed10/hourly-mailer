import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useUser } from "hooks";
import axios from "axios";
import { useRouter } from "next/router";

const ListShell: React.FC = ({ children }) => {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const logout = async () => {
    await axios.post("/api/logout");
    mutateUser(null)
    router.push("/login");
  };

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        direction="column"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          direction="row-reverse"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          h="60px"
        >
          <Flex alignItems="center" justifyContent="center">
            {user && (
              <Button variant="ghost" onClick={() => logout()}>
                Log Out
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex backgroundColor="gray.100" p={8} height="100vh">
          <Flex margin="0 auto" direction="column" w="100vw" maxW="1250px">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ListShell;

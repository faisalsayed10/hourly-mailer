import { Flex, Text } from '@chakra-ui/layout';
import React from 'react'

interface Props {}

const DashboardEmpty: React.FC<Props> = ({}) => {
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
      <Text fontSize="3xl" fontWeight="500" mb={6}>
        You don't have any lists
      </Text>
    </Flex>
  );
}

export default DashboardEmpty

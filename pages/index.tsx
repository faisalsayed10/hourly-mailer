import { Email, List } from ".prisma/client";
import { Box } from "@chakra-ui/layout";
import DashboardEmpty from "@components/DashboardEmpty";
import ListEmptyState from "@components/ListEmptyState";
import ListShell from "@components/ListShell";
import ListTable from "@components/ListTable";
import ListTableHeader from "@components/ListTableHeader";
import ListTableSkeleton from "@components/ListTableSkeleton";
import { useUser } from "hooks";
import React from "react";
import useSWR from "swr";

const Home: React.FC = () => {
  const { user } = useUser("/login", false);
  const { data: lists } = useSWR<List[]>(user ? ["/api/list", user?.id] : null);

  if (!lists) {
    return (
      <ListShell>
        <ListTableSkeleton />
      </ListShell>
    );
  }

  return (
    <ListShell>
      {lists?.length > 0 ? (
        lists.map((list: List & { emails: Email[] }) => {
          return (
            <Box
              key={list.id}
              mb="8"
            >
              <ListTableHeader name={list.name} listId={list.id} />
              {list.emails?.length ? (
                <ListTable listId={list.id} emails={list.emails} />
              ) : (
                <ListEmptyState listId={list.id} />
              )}
            </Box>
          );
        })
      ) : (
        <DashboardEmpty />
      )}
    </ListShell>
  );
};

export default Home;

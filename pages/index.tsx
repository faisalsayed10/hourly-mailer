import { useUser } from "hooks";
import ListEmptyState from "@components/ListEmptyState";
import ListTableSkeleton from "@components/ListTableSkeleton";
import ListShell from "@components/ListShell";
import useSWR from "swr";
import ListTable from "@components/ListTable";
import ListTableHeader from "@components/ListTableHeader";

const Home: React.FC = () => {
  const { user } = useUser("/login", false);
  const { data: lists } = useSWR(user ? ["/api/list", user?.id] : null);

  if (!lists) {
    return (
      <ListShell>
        <ListTableHeader />
        <ListTableSkeleton />
      </ListShell>
    );
  }

  return (
    <ListShell>
      <ListTableHeader />
      {lists.length ? (
        <ListTable lists={lists} />
      ) : (
        <ListEmptyState />
      )}
    </ListShell>
  );
}

export default Home;
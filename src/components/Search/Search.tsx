import {
  Box,
  CircularProgress,
  Input,
  List,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
  Typography,
} from "@mui/joy";
import {
  SearchRequest,
  SearchPeopleResponse,
  useSearchQuery,
} from "./searchApiSlice";
import AccountListItem from "./AccountListItem";
import { ChangeEvent, useState } from "react";
import Postiki from "../Postiki/Postiki";
import { useLocation, useParams } from "react-router-dom";
import PostikCard from "../Postiki/PostikCard";
import { Postik } from "../Postiki/postikiApiSlice";

const Search = () => {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useState<SearchRequest>({
    SearchText: state.SearchText || "",
    TabIndex: 0,
  });
  const [searchInputText, setSearchInputText] = useState(
    state.SearchText || "",
  );
  const { data, isLoading } = useSearchQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchParams({ ...searchParams, SearchText: searchInputText });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputText(event.target.value);
  };

  /*const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ ...searchParams, TabIndex: newValue });
  };*/

  const handleTabChange = (
    event: React.SyntheticEvent,
    value: number | string,
  ) => {
    setSearchParams({ ...searchParams, TabIndex: Number(value) });
  };

  return (
    <Stack spacing={2} sx={{ width: { xs: "100%", md: "100%", lg: "75%" } }}>
      <Input
        value={searchInputText}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <Tabs defaultValue={0} value={searchParams.TabIndex}>
        <TabList>
          <Tab value={0} onChange={handleTabChange}>
            Постики
          </Tab>
          <Tab value={1} onChange={handleTabChange}>
            Люди
          </Tab>
        </TabList>
        {isLoading ? (
          <CircularProgress variant="solid" />
        ) : (
          <Box>
            <TabPanel value={0}>
              <List>
                {data?.map((item: unknown) => {
                  const postik = item as Postik;
                  return <PostikCard key={postik.id} postik={postik} />;
                })}
              </List>
            </TabPanel>
            <TabPanel value={1}>
              <List>
                {data?.map((item: unknown) => {
                  const search = item as SearchPeopleResponse;
                  return (
                    <AccountListItem
                      key={search.id}
                      UserID={search.id}
                      userName={search.UserName}
                      subscribersNumber={search.SubscribersNumber}
                    />
                  );
                })}
              </List>
            </TabPanel>
          </Box>
        )}
      </Tabs>
    </Stack>
  );
};

export default Search;

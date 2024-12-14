"use client";
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
} from "@mui/joy";
import {
  SearchRequest,
  SearchPeopleResponse,
  useSearchQuery,
} from "../../components/Search/searchApiSlice";
import AccountListItem from "../../components/Search/AccountListItem";
import { ChangeEvent, useState } from "react";
import PostikCard from "../../components/Postiki/PostikCard";
import { Postik } from "../../components/Postiki/postikiApiSlice";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const searchPar = useSearchParams();
  const SearchText: string = searchPar.get("SearchText") || "";

  const [searchParams, setSearchParams] = useState<SearchRequest>({
    SearchText: SearchText || "",
    TabIndex: 0,
  });
  const [searchInputText, setSearchInputText] = useState(SearchText || "");
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

  const handleTabChange2 = (
    event: React.SyntheticEvent | null,
    value: number | string | null,
  ) => {
    setSearchParams({ ...searchParams, TabIndex: Number(value) });
  };

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
      <Tabs
        defaultValue={0}
        value={searchParams.TabIndex}
        onChange={handleTabChange2}
      >
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

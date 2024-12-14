import { Grid } from "@mui/joy";
import { useGetProfilePostiksQuery } from "./profileApiSlice";
import ProfilePostik from "./ProfilePostik";
import Link from "next/link";

const ProfilePostiks = (props: { UserID: string }) => {
  const { data: posts } = useGetProfilePostiksQuery(
    { id: props.UserID },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
      {posts?.map((post, index) => (
        <Grid xs={4} sm={4} md={4} key={index}>
          <Link
            href={{
              pathname: "/postik/view",
              query: { postik: JSON.stringify(post) },
            }}
          >
            <ProfilePostik post={post} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfilePostiks;

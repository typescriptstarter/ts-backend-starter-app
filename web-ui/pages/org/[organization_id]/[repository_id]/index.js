import { useRouter } from "next/router";
import React from "react";
import { useOnchain } from "/hooks/useOnchain";
import Dashboard from "/components/Dashboard";
const RepositoryPage = () => {
  const router = useRouter();
  const query = router.query;
  let { data, error, refresh, loading } = useOnchain(`/events`);

  return <Dashboard data={data} error={error} loading={loading} />;
};

export default RepositoryPage;

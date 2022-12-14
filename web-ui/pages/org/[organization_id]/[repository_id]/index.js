import { useRouter } from "next/router";
import React from "react";
import { useOnchain } from "/hooks/useOnchain";
import Dashboard from "/components/Dashboard";
import { useTuning } from "../../../../context/TuningContext";
import { useAPI } from "../../../../hooks/useAPI";

const RepositoryPage = () => {
  const router = useRouter();
  const query = router.query;
  const { startTimestamp } = useTuning();
  const org = query.organization_id;
  const repo = query.repository_id;
  let { data, error, loading } = useAPI(
    `/boostpow/rankings/github/issues/${org}/${repo}`,
    `?start_date=${startTimestamp}`
  );

  let { issues } = data || [];

  return <Dashboard data={issues} error={error} loading={loading} />;
};

export default RepositoryPage;

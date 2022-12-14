import { useRouter } from "next/router";
import React from "react";
import { useTuning } from "../../../context/TuningContext";
import { useOnchain } from "../../../hooks/useOnchain";
import Dashboard from "../../../components/Dashboard";
import { useAPI } from "../../../hooks/useAPI";

const OrganizationPage = () => {
  const router = useRouter();
  const query = router.query;
  const { startTimestamp } = useTuning();
  const org = query.organization_id;
  let { data, error, loading } = useAPI(
    `/boostpow/rankings/github/issues/${org}`,
    `?start_date=${startTimestamp}`
  );

  let { issues } = data || [];

  return <Dashboard data={issues} error={error} loading={loading} />;
};

export default OrganizationPage;

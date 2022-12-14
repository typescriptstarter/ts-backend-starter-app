import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";
import { useOnchain } from "../hooks/useOnchain";

const Index = () => {
  const { startTimestamp } = useTuning();
  const org = "pow-co";
  let { data, error, loading } = useAPI(
    `/boostpow/rankings/github/issues/${org}`,
    `?start_date=${startTimestamp}`
  );

  let { issues } = data || [];

  return <Dashboard data={issues} error={error} loading={loading} />;
};

export default Index;

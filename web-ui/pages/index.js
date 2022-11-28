import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";
import { useOnchain } from "../hooks/useOnchain";

const Index = () => {
  const { startTimestamp } = useTuning();
  let { data, error, refresh, loading } = useOnchain(`/events`); // , `?limit=21`
  //let { data: recent } = useAPI("/recent/questions?limit=100");

  return <Dashboard data={data} error={error} loading={loading} />;
};

export default Index;

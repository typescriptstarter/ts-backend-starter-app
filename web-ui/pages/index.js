import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";
import { useOnchain } from "../hooks/useOnchain";

const Index = () => {
  const { startTimestamp } = useTuning();
  let { data:events, error:error_events, refresh, loading:loading_events } = useOnchain(`/events`); // , `?limit=21`
  //let { data: recent } = useAPI("/recent/questions?limit=100");
  let { data:rankings, error:error_rankings, loading: loading_rankings} = useOnchain('/boostpow/rankings')

  let issues = []
  if(events && rankings){

    issues = [...rankings.rankings,...events.events]
    issues.map((issue) => {
      if(issue.content.action !== "opened"){
        return issue
      }
    })

  }

  return <Dashboard data={issues} error={error_events || error_rankings} loading={loading_events || loading_rankings} />;
};

export default Index;

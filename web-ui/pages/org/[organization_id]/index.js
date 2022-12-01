import { useRouter } from "next/router";
import React from "react";
import { useOnchain } from "../../../hooks/useOnchain";
import Dashboard from "../../../components/Dashboard";

const OrganizationPage = () => {
  const router = useRouter();
  const query = router.query;
  let { data:events, error:error_events, refresh, loading:loading_events } = useOnchain(`/events`); // , `?limit=21`
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

export default OrganizationPage;

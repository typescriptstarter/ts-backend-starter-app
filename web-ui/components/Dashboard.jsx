import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  ThreeColumnLayout,
  Loader,
  SimplePostCard,
  QuestionCard,
  Placeholder,
  Composer,
  PostCard,
  OnchainPostCard,
} from ".";

import moment from "moment";
import { useTuning } from "../context/TuningContext";
import { useRouter } from "next/router";
import { useBitcoin } from "../context/BitcoinContext";
import GithubIssueCard from "./GithubIssueCard";

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const Dashboard = ({ data, error, loading }) => {
  //const [issues, setIssues] = useState([]);
  const router = useRouter();
  const { authenticated } = useBitcoin();
  const { startTimestamp, tag, setTag } = useTuning();

  if (loading) {
    return (
      <ThreeColumnLayout>
        <div className="min-h-screen py-5">
          <Loader />
        </div>
      </ThreeColumnLayout>
    );
  }
  if(error){
    return (
      <ThreeColumnLayout>
        <div className="min-h-screen py-5">
          Error
        </div>
      </ThreeColumnLayout>
    )
  }

  
  //console.log(issues);

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="w-full py-5">
          <div className="relative">
            {data?.map((entry) => {
              if (entry) {
                return <GithubIssueCard key={entry.txid} {...entry} />;
              }
            })}
          </div>
        </div>
      </div>
    </ThreeColumnLayout>
  );
};

export default Dashboard;

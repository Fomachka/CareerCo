import React, { useState, useEffect } from "react";
import { HeaderMobile, HeaderDesktop } from "../";
import StatusContainer from "./StatusContainer";
import { yellowCase, blueCase, greenCase, redCase } from "../../images/icons/export";
import { useAuth } from "../../hooks/use-auth";
import { useCollection } from "../../hooks/use-collection";
import Chart from "./Chart";

const Dashboard = () => {
  const { id } = useAuth();
  const [users, setUsers] = useState();
  const [labels, setLabels] = useState();
  const { users: usersCollection } = useCollection("users");

  useEffect(() => {
    if (usersCollection) {
      setUsers(usersCollection.filter((user) => user.uid === id));
      setMonth(usersCollection.filter((user) => user.uid === id));
    }
  }, [usersCollection, id]);

  const setMonth = (data) => {
    if (data) {
      let arr = Array(12).fill(0);
      let dates = data.map((item) => new Date(item.date.split("/").join("-")).getMonth() + 1);
      for (let month of dates) {
        if (arr[month] !== 0) {
          arr[month - 1]++;
        } else {
          arr[month - 1]++;
        }
      }

      setLabels([...arr]);
    }
  };

  const handleUsers = (status) => {
    let sum = 0;
    if (status && users) {
      users.forEach((user) => {
        if (user.status === status) sum++;
      });
    }
    return sum;
  };

  return (
    <div className="dashboard">
      <HeaderMobile pageName="Dashboard" />
      <HeaderDesktop pageName="Dashboard" />
      <main className="main">
        <section className="dashboard__container">
          <StatusContainer
            img={yellowCase}
            text={"Pending Applications"}
            number={handleUsers("Pending")}
          />
          <StatusContainer img={blueCase} text={"Interviews Scheduled"} number={users?.length} />
          <StatusContainer
            img={greenCase}
            text={"Offers Received"}
            number={handleUsers("Accepted")}
          />
          <StatusContainer
            img={redCase}
            text={"Offers Declined"}
            number={handleUsers("Rejected")}
          />
        </section>
        <Chart data={labels && labels} />
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { fetchTasksAsync } from "../../features/taskSlice";
import moment from "moment";

ChartJs.register(Tooltip, Legend, ArcElement);

export default function TaskClosedBy() {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, []);

  const taskClosedByTeam =
    tasks && tasks?.length > 0
      ? tasks?.filter((task) => task.status === "Completed")
      : [];

  const taskCountByTeam =
    taskClosedByTeam?.length > 0 &&
    taskClosedByTeam?.reduce((acc, curr) => {
      const teamName = curr.team?.name;
      acc[teamName] = (acc[teamName] || 0) + 1;
      return acc;
    }, {});

  const pieChartData = {
    labels: Object.keys(taskCountByTeam),
    datasets: [
      {
        label: "Total Task",
        data: Object.values(taskCountByTeam),
        backgroundColor: [
          "rgb(255,204,153,0.9)",
          "rgb(224,224,224,0.9)",
          "rgb(204,255,229,0.9)",
          "rgb(247, 220, 111, 0.9)",
          "rgb(195, 155, 211 , 0.9)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <h4 className="content-heading text-center">Tasks Closed By Teams:</h4>
      {status === "Loading" ? (
        <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
          Pie char is loading...
        </p>
      ) : (
        <Pie data={pieChartData} options={options} />
      )}
    </div>
  );
}

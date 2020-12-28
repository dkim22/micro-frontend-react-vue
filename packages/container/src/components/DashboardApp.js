import { mount } from "dashboard/DashboardApp";
import React, { useEffect, useRef } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div id="dashboard-app" ref={ref} />;
};

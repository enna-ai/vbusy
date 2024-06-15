"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Widget from "$components/Widget";
import type { Task } from "$interfaces/task";
import { API_BASE_URL } from "$utils/consts";
import axios from "axios";

const parseQueryParam = (param: string | null): boolean => {
  return param ? JSON.parse(param) : false;
};

const WidgetPage: React.FC = () => {
    const [userData, setUserData] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");
    const headerColor = searchParams.get("headerColor");
    const bodyColor = searchParams.get("bodyColor");
    const textColor = searchParams.get("textColor");
    const accentColor = searchParams.get("accentColor");
    const borderRadius = parseQueryParam(searchParams.get("borderRadius"));
    const dueDates = parseQueryParam(searchParams.get("dueDates"));
    const priorityLevels = parseQueryParam(searchParams.get("priorityLevels"));
    const hideCompleted = parseQueryParam(searchParams.get("hideCompleted"))

    const fetchUserTasks = async (userId: string | null) => {
      try {
        setError(null);

        if (!userId) {
          setError("Missing User ID");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/v1/vbusy/tasks/${userId}`);
        const data = await response.data;
        const filteredData = data.filter((item: Task) => !item.archived);

        setUserData(filteredData);
      } catch (error) {
        setError("Invalid User ID");
      }
    }

    useEffect(() => {
      fetchUserTasks(userId);
    }, [userId]);

    return (
      <Widget
          userId={userId}
          headerColor={headerColor}
          bodyColor={bodyColor}
          textColor={textColor}
          accentColor={accentColor}
          borderRadius={borderRadius}
          dueDates={dueDates}
          priorityLevels={priorityLevels}
          hideCompleted={hideCompleted}
          userData={userData}
          errorMsg={error}
        />
    )
};

export default WidgetPage;

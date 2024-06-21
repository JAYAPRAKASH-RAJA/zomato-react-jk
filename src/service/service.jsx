import React, { useState, useEffect } from "react";
import axios from "axios";

const base_url = "http://localhost:3002/api/";
const token = localStorage.getItem("token");

const get = async (url) => {
  try {
    const response = await axios.get(`${base_url}${url}`, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err; // Propagate the error upwards
  }
};

const post = async (url, data) => {
  try {
    const response = await axios.post(`${base_url}${url}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
    throw err; // Propagate the error upwards
  }
};

const useInterceptor = () => {
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (req) => {
        // Add configurations here
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (res) => {
        // Add configurations here
        if (res.status === 201) {
          console.log("Posted Successfully");
        }
        return res;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    return () => {
      // Clean up interceptors when component unmounts
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []); // Empty dependency array ensures effect runs only once
};

const FunctionalComponent = () => {
  const [data, setData] = useState(null);

  // Initialize interceptors
  useInterceptor();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("example-endpoint"); // Replace with your endpoint
        setData(result);
      } catch (error) {
        console.error("Error fetching data in useEffect:", error);
        // Handle error state or notify user
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []); // Empty dependency array ensures effect runs only once

  return (
    <div>
      {/* Render your component UI here */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default FunctionalComponent;

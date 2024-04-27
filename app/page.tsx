"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://backend-gej8.onrender.com/stocks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(async (res) => {
      if (res.status == 401) {
        router.push("/login");
      }
      if (res.ok) {
        const data = await res.json();
        setData(data);
      }
    });
    if (localStorage.getItem("token") == undefined) {
      router.push("/login");
    } else {
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {data.map(
        (item: {
          datetime: string;
          open: string;
          high: string;
          low: string;
          close: string;
          volume: string;
          
        }) => (
          <div
            style={{
              backgroundColor: "white",
              height: "200px",
              width: "300px",
            }}
          >
            <p>datetime:{item.datetime}</p>
            <p>date: {item.datetime.split(" ")[0]}</p>
            <p>time: {item.datetime.split(" ")[1]}</p>
            <p>open:{item.open}</p>
            <p>high:{item.high}</p>
            <p>low:{item.low}</p>
            <p>close:{item.close}</p>
            <p>volume: {item.volume}</p>
          </div>
        )
      )}
    </div>
  );
}

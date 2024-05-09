"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [ticker, setTicker] = useState();
  function tickerhandle(event: any) {
    setTicker(event.target.value);
  }
  const [decimal, setDecimal] = useState();
  function decimalhandle(event: any) {
    setDecimal(event.target.value);
  }
  const [outputsize, setOutputsize] = useState();
  function outputhandle(event: any) {
    setOutputsize(event.target.value);
  }
  const [interval, setInterval] = useState();
  function intervalhandle(event: any) {
    setInterval(event.target.value);
  }
  const [startdate, setDate] = useState();
  function startdatehandle(event: any) {
    setDate(event.target.value);
  }
  const [starttime, setStarttime] = useState();
  function starttimehandle(event: any) {
    setStarttime(event.target.value);
  }




  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Data" {...a11yProps(0)} />
          <Tab label="Create API" {...a11yProps(1)} />
          <Tab label="Whatever goes here" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
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
                  key={item.datetime}
                  style={{
                    backgroundColor: "white",
                    height: "200px",
                    width: "180px",
                  }}
                >
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
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <p>
            https://api.twelvedata.com/time_series?apikey=110574cb274041938b5bde5630eeb858&interval=
            {interval}min&symbol=
            {ticker}&dp={decimal}
            &outputsize={outputsize}
            &type=stock&dp=2&timezone=exchange&start_date={startdate}
            {" "}{starttime}&end_date=2024-04-17 15:59:00&format=JSON
          </p>
          <p>390 length 1min chart</p>
          <input
            placeholder="stock name"
            value={ticker}
            onChange={tickerhandle}
          ></input>
          <input
            placeholder="decimal places"
            value={decimal}
            onChange={decimalhandle}
          ></input>
          <input
            placeholder="output size"
            value={outputsize}
            onChange={outputhandle}
          ></input>
          <input
            placeholder="interval"
            value={interval}
            onChange={intervalhandle}
          ></input>
          <input
            type="date"
            placeholder="startdate"
            value={startdate}
            onChange={startdatehandle}
          ></input>
          <input
            type="time" step="1"
            placeholder="starttime"
            value={starttime}
            onChange={starttimehandle}
          ></input>
          
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

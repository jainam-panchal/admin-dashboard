import React, { useEffect, useState, useMemo } from "react"
import Table from "./Table";
import axios from "axios"

// Given EndPoint 
const baseUrl = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

export default function Dashboard() {

    // Uplifting State and fetching the data
    const [empData, setEmpData] = React.useState([]);
    React.useEffect(() => {
        axios.get(baseUrl).then((response) => {
            setEmpData(response.data);
        });
    }, []);

    return (
        <div>
            <Table empData={empData} setEmpData={setEmpData} />
        </div>
    )
} 
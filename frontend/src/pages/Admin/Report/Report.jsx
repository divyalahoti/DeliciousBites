import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Report.css"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import AOS from "aos";
import "aos/dist/aos.css";

const Report = () => {
    const { backendUrl } = useContext(ShopContext);

    const [report, setReport] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalBookings: 0,
        totalExpense: 0,
        profit: 0,
    });

    // Chart Data
    const chartData = [
        { name: "Revenue", value: report.totalRevenue },
        { name: "Expense", value: report.totalExpense },
        { name: "Profit", value: report.profit },
    ];

    useEffect(() => {
        fetchReport();
        AOS.init({ duration: 1000, once: true });
    }, []);

    const fetchReport = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/report/report`);

            if (res.data.success) {
                setReport(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Delicious Bites Restaurant", 14, 15);

        doc.setFontSize(12);
        doc.text("Business Report", 14, 25);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);

        doc.setFillColor(240, 240, 240);
        doc.rect(14, 40, 180, 15, "F");

        doc.setFontSize(14);
        doc.text(`Profit: ₹${report.profit}`, 20, 50);

        let y = 70;

        const addLine = (label, value) => {
            doc.text(label, 14, y);
            doc.text(value, 150, y);
            y += 10;
        };

        addLine("Total Orders:", String(report.totalOrders));
        addLine("Revenue:", `₹${report.totalRevenue}`);
        addLine("Bookings:", String(report.totalBookings));
        addLine("Expense:", `₹${report.totalExpense}`);
        addLine("Profit:", `₹${report.profit}`);

        doc.save("Report.pdf");
    };

    // Excel
    const exportToExcel = () => {
        const data = [
            { Metric: "Total Orders", Value: report.totalOrders },
            { Metric: "Revenue", Value: report.totalRevenue },
            { Metric: "Bookings", Value: report.totalBookings },
            { Metric: "Expense", Value: report.totalExpense },
            { Metric: "Profit", Value: report.profit },
        ];

        const ws = XLSX.utils.json_to_sheet(data);
        ws["!cols"] = [{ wch: 20 }, { wch: 20 }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");

        const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        saveAs(
            new Blob([buffer], {
                type: "application/octet-stream",
            }),
            "Report.xlsx"
        );
    };

    return (
        <div className="report-container">
            {/* HEADER */}
            <div className="report-header" data-aos="fade-down">
                <h2>📊 Business Report</h2>
                <p>Real-time analytics & performance overview</p>
            </div>

            {/* CARDS */}
            <div className="report-cards">
                <div className="card" data-aos="zoom-in">
                    <h4>Orders</h4>
                    <p>{report.totalOrders}</p>
                </div>

                <div className="card" data-aos="zoom-in" data-aos-delay="100">
                    <h4>Revenue</h4>
                    <p>₹{report.totalRevenue}</p>
                </div>

                <div className="card" data-aos="zoom-in" data-aos-delay="200">
                    <h4>Expense</h4>
                    <p>₹{report.totalExpense}</p>
                </div>

                <div className="card profit" data-aos="zoom-in" data-aos-delay="300">
                    <h4>Profit</h4>
                    <p>₹{report.profit}</p>
                </div>
            </div>

            {/* CHART */}
            <div className="chart-box" data-aos="fade-up">
                <h3>📈 Performance Overview</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ACTION BUTTONS */}
            <div className="actions" data-aos="fade-up">
                <button className="btn pdf" onClick={downloadPDF}>
                    📥 Download PDF
                </button>

                <button className="btn excel" onClick={exportToExcel}>
                    📊 Export Excel
                </button>
            </div>
        </div>
    );
};

export default Report;
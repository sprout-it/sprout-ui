import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4geodata_thailand from "@amcharts/amcharts4-geodata/json/thailandHigh.json";
// import * as am4geodata_thailand from "@amcharts/amcharts4-geodata/thailandHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useRef, useEffect, useLayoutEffect } from 'react'

am4core.useTheme(am4themes_animated);

const Chart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chart = am4core.create(chartRef.current, am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_thailand.default;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        // polygonSeries.exclude = "TH-10"

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#74B266");

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");
        polygonTemplate.events.on('down', e => {
            console.log(polygonSeries.data)
        })

        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <div ref={chartRef} style={{ width: "827px", height: "500px" }}></div>
    );
}

export default Chart
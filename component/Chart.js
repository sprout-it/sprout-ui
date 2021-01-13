import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4geodata_thailand from "../utils/thailandHigh.json";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useRef, useEffect, useLayoutEffect } from 'react'

am4core.useTheme(am4themes_animated);

const Chart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chart = am4core.create(chartRef.current, am4maps.MapChart);
        chart.geodata = am4geodata_thailand.default;
        chart.projection = new am4maps.projections.Miller();

        let defaultPolygon = chart.series.push(new am4maps.MapPolygonSeries());
        defaultPolygon.useGeodata = true;
        let polygonTemplate = defaultPolygon.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");

        let havePackage = chart.series.push(new am4maps.MapPolygonSeries());
        havePackage.useGeodata = true;
        havePackage.include = ['TH-10']
        console.log(havePackage.data)
        polygonTemplate = havePackage.mapPolygons.template;
        polygonTemplate.fill = am4core.color("#96BDC6");
        polygonTemplate.tooltipText = "{name}";
        hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");

        polygonTemplate.events.on('down', e => {
            console.log(defaultPolygon.data)
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
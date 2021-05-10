import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData={
    labels: string[];
    series : number[];
}

const DonutChart = () => {
        //FORMA CERTA
    const [chartData,setChartData] = useState<ChartData>({labels: [], series: []});

    //forma errada de declara variável
   // let chartData : ChartData = { labels: [], series: []};

    //forma errada
    //axios.get(`${BASE_URL}/sales/amount-by-seller`)
      //  .then(response => {
        //    console.log(response.data);
       // });

//ainda na FORMA ERRADA pois ta sendo chamada varias vezes
   //    axios.get(`${BASE_URL}/sales/amount-by-seller`)
//       .then(response => {
  //         const data = response.data as SaleSum[];
    //       const myLabels = data.map(x => x.sellerName);
      //     const mySeries = data.map(x => x.sum);
           //forma certa
        //   setChartData({ labels: myLabels, series: mySeries });
           //forma errada
          // chartData = { labels: myLabels, series: mySeries };
        //   console.log(chartData);
     //  });

       useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(response => {
            const data = response.data as SaleSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);
            setChartData({ labels: myLabels, series: mySeries });
          //  console.log(chartData); 
        });
 
       },[]);



   // const mockData = {
   //     series: [477138, 499928, 444867, 220426, 473088],
   //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  //  }
    
    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels:chartData.labels}}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;
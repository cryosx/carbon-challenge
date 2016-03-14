Template.emissionsNav.helpers({
    totalTransportationCarbon: function () {
        return (Session.get("totalCarCarbon") + Session.get("totalMotorcycleCarbon") + Session.get("totalBusCarbon") + Session.get("totalRailCarbon") + Session.get("totalFlyingCarbon")).toFixed(2);
    },
    totalHousingCarbon: function () {
        return (Session.get("totalElectricityCarbon") + Session.get("totalNaturalGasCarbon") + Session.get("totalPropaneAndOtherCarbon") + Session.get("totalWaterCarbon"));
    },
    totalFoodCarbon: function () {
        return Session.get("totalFoodCarbon");
    },
    totalRecyclingCarbon: function () {
        return Session.get("totalRecyclingCarbon");
    },
    createTransportationChart: function () {
        // Gather data:
        var tasksData = [{
            y: Session.get("totalCarCarbon"),
            name: "Car"
        }, {
            y: Session.get("totalMotorcycleCarbon"),
            name: "Motorcycle"
        }, {
            y: Session.get("totalBusCarbon"),
            name: "Bus"
        }, {
            y: Session.get("totalRailCarbon"),
            name: "Rail"
        }, {
            y: Session.get("totalFlyingCarbon"),
            name: "Motorcycle"
        }];

        // Use Meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function () {
            // BEGIN: THIS IS A THEME

            Highcharts.setOptions(Highcharts.theme);

            // Create standard Highcharts chart with options:
            Highcharts.chart('transportationChart', {
                chart: {
                    height: 100,
                    width: 100,
                    //backgroundColor: null,
                    //plotBackgroundColor: null,
                    //plotBackgroundImage: null,
                    spacing: [0, 0, 0, 0]
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    //size: 100,
                    data: tasksData,
                    dataLabels: {
                        enabled: false
                    }
                }],
                title: {
                    text: null
                }
            });
        });
    }
});

Template.emissionsNav.events({
    //add your events here
});

Template.emissionsNav.onCreated(function () {
    //add your statement here
});

Template.emissionsNav.onRendered(function () {
    $('ul.tabs').tabs();
});

Template.emissionsNav.onDestroyed(function () {
    //add your statement here
});

Highcharts.theme = {
    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: "Signika, serif"
        }
    },
    title: {
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },
    subtitle: {
        style: {
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    yAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },

    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },
    scrollbar: {
        trackBorderColor: '#C0C0C8'
    },
    // General
    background2: '#E0E0E8'

};
// END: THIS IS A THEME
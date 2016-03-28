function getTotalTransportationCarbon() {
    return (Session.get("totalCarCarbon") + Session.get("totalMotorcycleCarbon") + Session.get("totalBusCarbon") + Session.get("totalRailCarbon") + Session.get("totalFlyingCarbon")).toFixed(2);

}
Template.emissionsNav.helpers({
    totalTransportationCarbon: function () {
        return getTotalTransportationCarbon();
        //return Session.get("totalTransportationCarbon").toFixed(2);
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
                    height: 200,
                    //width: 100,
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
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                series: [{
                    type: 'pie',
                    //size: 100,
                    data: tasksData,
                    dataLabels: {
                        enabled: false
                    },
                    innerSize: '50%'
                }],
                title: {
                    text: getTotalTransportationCarbon()+"<br> tons of CO<sub>2</sub>",
                    align: 'center',
                    verticalAlign: 'middle',
                    style: {'color': 'white'},
                    y: 55
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                }
            });
        });
    },
    createHousingChart: function () {
        // Gather data:
        var tasksData = [{
            y: Session.get("totalElectricityCarbon"),
            name: "Electricity"
        }, {
            y: Session.get("totalNaturalGasCarbon"),
            name: "Natural Gas"
        }, {
            y: Session.get("totalPropaneAndOtherCarbon"),
            name: "Propane And Other Fuels"
        }, {
            y: Session.get("totalWaterCarbon"),
            name: "Water"
        }];

        // Use Meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function () {
            // BEGIN: THIS IS A THEME

            Highcharts.setOptions(Highcharts.theme);

            // Create standard Highcharts chart with options:
            Highcharts.chart('housingChart', {
                chart: {
                    height: 200,
                    //width: 100,
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
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                series: [{
                    type: 'pie',
                    //size: 100,
                    data: tasksData,
                    dataLabels: {
                        enabled: false
                    },
                    innerSize: '50%'
                }],
                title: {
                    text: getTotalTransportationCarbon()+"<br> tons of CO<sub>2</sub>",
                    align: 'center',
                    verticalAlign: 'middle',
                    style: {'color': 'white'},
                    y: 55
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                }
            });
        });
    },
    createFoodChart: function () {
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
            Highcharts.chart('foodChart', {
                chart: {
                    height: 200,
                    //width: 100,
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
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                series: [{
                    type: 'pie',
                    //size: 100,
                    data: tasksData,
                    dataLabels: {
                        enabled: false
                    },
                    innerSize: '50%'
                }],
                title: {
                    text: getTotalTransportationCarbon()+"<br> tons of CO<sub>2</sub>",
                    align: 'center',
                    verticalAlign: 'middle',
                    style: {'color': 'white'},
                    y: 55
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                }
            });
        });
    },
    createRecyclingChart: function () {
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
            Highcharts.chart('recyclingChart', {
                chart: {
                    height: 200,
                    //width: 100,
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
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                series: [{
                    type: 'pie',
                    //size: 100,
                    data: tasksData,
                    dataLabels: {
                        enabled: false
                    },
                    innerSize: '50%'
                }],
                title: {
                    text: getTotalTransportationCarbon()+"<br> tons of CO<sub>2</sub>",
                    align: 'center',
                    verticalAlign: 'middle',
                    style: {'color': 'white'},
                    y: 55
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
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
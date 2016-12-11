var Activity = function(data) {

  var getEventsByDay = function() {
    var dates = this.getAllDates(data);
    var eventsByDay = {};

    _.map(dates, function(date) {
      eventsByDay[date] = {
        ymd: date,
        count: 0
      };
    });

    return eventsByDay;
  }.bind(this);

  var eventsByDay = getEventsByDay();

  _.map(data, function(event) {
    if (eventsByDay[event.ymd]) {
      eventsByDay[event.ymd].count++;
    } else {
      eventsByDay[event.ymd] = {
        ymd: event.ymd,
        count: 1
      };
    }
  });

  this.data = [];

  _.forOwn(eventsByDay, function(val, date) {
    this.data.push({ ymd: date, count: val.count });
  }.bind(this));

  if ($('svg').length > 0) $('svg').remove();
  this.drawChart();
};


Activity.prototype.getAllDates = function(data) {

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getDates(startDate, endDate) {
    var dates = [];
    var currentDate = new Date(startDate);

    while (currentDate < endDate) {
      var date = new Date(currentDate);
      dates.push(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
      currentDate = new Date(currentDate).addDays(1);
    }

    return dates;
  }

  var firstEventDate = new Date(data[0].ymd);
  var lastEventDate = new Date(data[data.length - 1].ymd);
  return getDates(firstEventDate, lastEventDate);
};


Activity.prototype.drawChart = function() {
  var margin = {top: 0, right: 15, bottom: 20, left: 15};
  var width = (Math.floor(window.innerWidth * 0.3)) - margin.left - margin.right;
  var height = 130 - margin.top - margin.bottom;

  var xScale = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(this.data, function(d) { return new Date(d.ymd); }));

  var yScale = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(this.data, function(d) { return d.count; }));

  var formatDate = d3.time.format("%m.%d.%y");

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickFormat(function(d) { return formatDate(d); })
      .ticks(4)
      .innerTickSize(0);

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('right');

  var line = d3.svg.line()
    .x(function(d) { return xScale(new Date(d.ymd)); })
    .y(function(d) { return yScale(d.count); });

  var svg = d3.select('.activity').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('path')
   .datum(this.data)
   .attr('class', 'line')
   .attr('d', line);

  svg.append('g')
     .attr('class', 'x axis')
     .attr('transform', 'translate(0,' + (height + 10) + ')')
     .call(xAxis);

  svg.append('g')
     .attr("class", "y axis")
     .call(yAxis)
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr('y', 6)
     .attr('dy', '.71em')
     .style('text-anchor', 'end')
     .text('Click Events');
};

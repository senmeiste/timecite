var thmeLong;
timeLong = function (long) {
    this.long = long;
    this.thisTime = function (long) {
        if(long){
            return new Date(long).getTime()
        }else if(this.long){
            return  new Date(this.long).getTime()
        }else {
            return new Date().getTime()
        }
    };
    //年
    this.FullYear=function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getFullYear();
    };
    //月
    this.Month=function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getMonth() + 1;
    };
    //日
    this.Date=function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getDate();
    };
    //时
    this.Hours=function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getHours();
    };
    //分
    this.Minutes=function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getMinutes();
    };
    //秒
    this.Seconds=function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getSeconds();
    };
    //周几
    this.getDay = function(long){
        var thislong = this.thisTime(long);
        return new Date(thislong).getDay();
    };
    //这个月有几天
    this.getMonthDay = function(long){
        var thislong = this.thisTime(long);
        return new Date(this.FullYear(thislong),this.Month(thislong),0).getDate();
    };
    //闰年  and 平年
    this.isTowyear = function(long){
        var FullYear = this.FullYear(long);
        if (FullYear%4 == 0 && FullYear%100!= 0){
            return true
        }else if (FullYear%400 == 0 && FullYear%100!= 0){
            return true
        }{
            return false
        }
    };
}

//当前时间或long时间转化
timeLong.prototype.formatTime = function (long,format) {
    format = format || 'Y-M-D h:m'
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var thislong = this.thisTime(long);
    var returnArr = [this.FullYear(thislong),this.Month(thislong),this.Date(thislong),this.Hours(thislong),this.Minutes(thislong),this.Seconds(thislong)];
    for (var i in returnArr) {
        let item = returnArr[i].toString();
        item = item[1]? item :"0"+item
        format = format.replace(formateArr[i], item);
    }
    return format
};
//相邻月份返回时间详细
timeLong.prototype.neighborMonth = function (long,type = true) {
    var thislong = this.thisTime(long);
    var neighborMonth = {};
    if(type && type == true){//默认上月数据
        neighborMonth.Month = this.Month(thislong) > 2 ? this.Month(thislong) -1 : 12;
        if(this.Month(thislong) > 2){
            neighborMonth.FullYear = this.FullYear(thislong)
            neighborMonth.Date = this.Date(thislong)
        }else{
            neighborMonth.FullYear = this.FullYear(thislong) -1
            neighborMonth.Date = this.Date(thislong)
        }
    }else if(type && typeof type == "string"){//本月数据
        neighborMonth.Month = this.Month(thislong);
        neighborMonth.FullYear = this.FullYear(thislong);
        neighborMonth.Date = this.Date(thislong);
    }else{//下月数据
        neighborMonth.Month = this.Month(thislong) > 11 ? 1 : this.Month(thislong) + 1;
        if(this.Month(thislong) > 11){
            neighborMonth.FullYear = this.FullYear(thislong) +1
            neighborMonth.Date = this.Date(thislong)
        }else{
            neighborMonth.FullYear = this.FullYear(thislong)
            neighborMonth.Date = this.Date(thislong)
        }
    }
    neighborMonth.Hours = this.Hours(thislong)
    neighborMonth.Minutes = this.Minutes(thislong)
    neighborMonth.formatTime = neighborMonth.FullYear + "-" +neighborMonth.Month + "-" + neighborMonth.Date + " " + neighborMonth.Hours  + ":" + neighborMonth.Minutes;
    neighborMonth.thisTime = this.thisTime(neighborMonth.formatTime);
    neighborMonth.getMonthDay = this.getMonthDay(neighborMonth.thisTime);
    neighborMonth.getDay = this.getDay(neighborMonth.thisTime);
    neighborMonth.isTowyear = this.isTowyear(neighborMonth.thisTime);
    neighborMonth.OneDataDay = this.getDay(neighborMonth.FullYear + "-" +neighborMonth.Month + "-01" + "  12:00");
    return neighborMonth
};





var thisTimes = new timeLong();

console.log(thisTimes.thisTime())
console.log(thisTimes.formatTime(1587094361151))
console.log(thisTimes.formatTime())
console.log(thisTimes.neighborMonth())

console.log(thisTimes.neighborMonth(null,false))
console.log(thisTimes.neighborMonth(null,"this"))





















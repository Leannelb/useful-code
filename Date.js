Date.prototype.weekday_names=[
	{
		short: 'Sun',
		long: 'Sunday'
	},
	{
		short: 'Mon',
		long: 'Monday'
	},
	{
		short: 'Tue',
		long: 'Tuesday'
	},
	{
		short: 'Wed',
		long: 'Wednesday'
	},
	{
		short: 'Thu',
		long: 'Thursday'
	},
	{
		short: 'Fri',
		long: 'Friday'
	},
	{
		short: 'Sat',
		long: 'Saturday'
	}
];

Date.prototype.month_names=[
	{
		short: 'Jan',
		long: 'January',
	},
	{
		short: 'Feb',
		long: 'February',
	},
	{
		short: 'Mar',
		long: 'March',
	},
	{
		short: 'Apr',
		long: 'April',
	},
	{
		short: 'May',
		long: 'May',
	},
	{
		short: 'Jun',
		long: 'June',
	},
	{
		short: 'Jul',
		long: 'July',
	},
	{
		short: 'Aug',
		long: 'August',
	},
	{
		short: 'Sep',
		long: 'September',
	},
	{
		short: 'Oct',
		long: 'October',
	},
	{
		short: 'Nov',
		long: 'November',
	},
	{
		short: 'Dec',
		long: 'December',
	}
];

Date.prototype.format_values=function(){
	var date=this;
	
	var values={
		'd': function(){
			var j=this.j();
			
			if(j<10){
				return '0'+j;
			}
			else{
				return j;
			}			
		},
		'D': function(){
			return date.weekday_names[this.w()].short;
		},
		'j':function(){
			return date.getDate();
		},
		'l':function(){
			return date.weekday_names[this.w()].short;
		},
		'N':function(){
			return this.w()+1;
		},
		'S':function(){
			//erm, i reckon this is probably about right haha.
			var j=this.j().toString();
			var tens=j.substring(j.length-1);
			var ones=j.substring(j.length-1);
			
			if(tens==11||tens==12||tens==13){
				return 'th';
			}
			else{
				var ret_val;
				switch(ones){
					case 1:
						ret_val='st';
						break;
					case 2:
						ret_val='nd';
						break;
					case 3:
						ret_val='rd';
						break;
					default:
						ret_val='th';
					break;
				}
				
				return ret_val;
			}
		}, 
		'w': function(){
			return date.getDay();
		},
		'F':function(){
			var month=this.n();
			return date.month_names[month].long;
		},
		'm':function(){
			var month=this.n();
			
			if(month<10){
				return "0"+month;
			}
			else{
				return month;
			}
		},
		'M':function(){
			var month=this.n();
			return date.month_names[month].short;
		},
		'n':function(){
			return date.getMonth();
		},
		'Y':function(){
			return date.getFullYear();
		},
		'y': function(){
			var year=this.Y().toString();
			return year.substring(2,year.length);
		},
		'a': function(){
			var hours=this.G();
			
			if(hours<12){
				return 'am';
			}
			else{
				return 'pm';
			}
		},
		'A':function(){
			return this.a().toUpperCase();
		},
		'g':function(){
			var hours=this.G();
			
			if(hours>12){
				return hours-12;
			}
			else{
				return hours;
			}
		},
		'G':function(){
			return date.getHours();
		},
		'h':function(){
			var hours=this.G();
			
			if(hours>12){
				hours=hours-12;
			}
			
			if(hours<10){
				return "0"+hours;
			}
			else{
				return hours;
			}
		},
		'H':function(){
			var hours=this.G();
			
			if(hours<10){
				return "0"+hours;
			}
			else{
				return hours;
			}
		},
		'i':function(){
			var minutes=date.getMinutes();
			
			if(minutes<10){
				return "0"+minutes;
			}
			else{
				return minutes;
			}
		},
		's':function(){
			var seconds=date.getSeconds();
			
			if(seconds<10){
				return "0"+seconds;
			}
			else{
				return seconds;
			}
		},
		'U':function(){
			return date.getTime();
		}
	};
	
	return values;
};

Date.prototype.format=function(format){
	var values=this.format_values();
	var format_placeholders_regex=/([dDjlNSwzWFmMntLYyaAgGhHisU]{1})/g;
	var matches=format.match(format_placeholders_regex);
	
	if(matches!==false&&Array.isArray(matches)){
		for(var i=0; i<matches.length; i++){
			var match=matches[i];
			
			if(typeof values[match]=='function'){
				format=format.replace(match,values[match]());
			}
			else{
				continue;
			}
		}
		
		return format;
	}
	else{
		console.log('Fomat incorrect');
	}
};

function setDatePicker() {
        $.each($('.datepicker'), function(key, value) {
                setElementDatePicker(value);
        });
}
var setElementDatePicker = function (value, minDate) {
    $(value).datepicker('destroy');
    $(value).attr('readonly', 'readonly');
    $(value).datepicker({
            dateFormat: 'dd/mm/yy',
            autoSize: true,
            firstDay: 1,
            changeMonth: true,
            changeYear: true,
            yearRange: 'c-65:c+65',
            dayNamesMin: [_('Su'), _('Mo'), _('Tu'), _('We'), _('Th'), _('Fr'), _('Sa')],
            monthNames: [_('January'), _('February'), _('March'), _('April'), _('May'), _('June'), _('July'),
                         _('August'), _('September'), _('October'), _('November'), _('December')],
            monthNamesShort: [_('short_January'), _('short_February'), _('short_March'), _('short_April'), 
                              _('short_May'), _('short_June'), _('short_July'), _('short_August'), _('short_September'), 
                              _('short_October'), _('short_November'), _('short_December')]
    });
    $(value).click(function(element) {
        $(value).datepicker('show');
        $(value).val('');
    });

}.defaults(null, null);

function getFormattedDate(date) {
	if (typeof date != 'object' && $P.empty(date)) {
		return '';
	}
	if (typeof date != 'object') {
		var date = new Date(date);
	}
    if (date == null) {
            return "";
    }
    var day = date.getDate();
    var month = (date.getMonth() + 1);
    if (day < 10) {
            day = "0" + day;
    }
    if (month < 10) {
            month = "0" + month;
    }
    return day + "/" + month + "/" +  date.getFullYear();
}

var isValidDate = function(dateString) {
    var regexp = new RegExp(/^[0-3]?[0-9]\/[0-1]?[0-9]\/\d+$/);
    if ($P.empty(regexp.exec(dateString))) {
            return false;
    }        
    return true;
};

function parseDateHour(dateString) {
//  2012-01-24 00:00:00.0
    var regexp = new RegExp(/(\d+)\-(\d+)\-(\d+)\s(\d+):(\d+):(\d+)\.(\d+)/);
    var result = regexp.exec(dateString);
    return {date: getFormattedDate(new Date(result[1], (result[2] - 1), result[3])), hour: result[4] + ':' + result[5]};
}

function getDateByString(dateString, hourString){
    var regexpDate = new RegExp(/(\d+)\/(\d+)\/(\d+)/);
    var regexpHour = new RegExp(/(\d+)\:(\d+)/);
    var date = regexpDate.exec(dateString);
    var hour = regexpHour.exec(hourString);
    if(date == null && hour == null){
        return false;
    } else if( hour == null){
        return new Date(date[3], date[2]-1, date[1], 0, 0, 0, 0);    
    }
    return new Date(date[3], date[2]-1, date[1], hour[1], hour[2], 0, 0);
}

function composeStringDate(date) {
    if (date == null) {
        return '';
    }
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes(); 
    var seconds = date.getSeconds()
    if(day < 10){
        day = '0' + day;
    }
    if(month < 10){
        month = '0' + month;
    }
    if(hour < 10){
        hour = '0' + hour;
    }
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    var dateString = date.getFullYear() + '-'
            + month + '-'
            + day;
    return dateString;
    dateString = dateString + " " + hour + ":" + minutes + ":" + seconds + ".0";
    return dateString;
}


function checkHour(hour) {
    var regexp = new RegExp(/^(\d+):(\d+)$/);
    var result = regexp.exec(hour);
    if ($P.empty(result)) {
    	return false;
    }
    var h = result[1];
    var m = result[2];
    if (h < 0 || h > 23) {
    	return false;
    }
    if (m < 0 || m > 59) {
    	return false;
    }
    return true;
}
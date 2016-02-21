class MomentFilter {

    public static getInstance(moment: moment.MomentStatic): any {

        return function(dateString, format) {
            moment.locale('it')
            return moment(dateString).format(format);
        };
    }
}
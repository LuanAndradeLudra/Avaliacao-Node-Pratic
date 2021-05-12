class Utils{
    static objSize(obj) {

        var size = 0, key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }

        return size;
    };
}

module.exports = Utils;
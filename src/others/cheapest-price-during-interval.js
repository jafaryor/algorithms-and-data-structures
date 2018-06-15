/*
    There is a shop, where vendors sell items. They all sell same item but they can change the price
    of the item during the day. Given intervals of time and a lower price for the item during this
    interval for each vendor, calculate the cheapest price for the item during the day within
    different time intervals. vendors data for each vendor is {startTime, endTime, price}.
    
    For example for 3 vendors in the shop: [{0, 4, 5}, {2, 8, 3}, {7, 11, 10}],
    the result should be [{0, 2, 5}, {2, 8, 3}, {8, 11, 10}]
*/

/**
 * @typedef {Object} Vendor
 * @property {number} startTime
 * @property {number} endTime
 * @property {number} price
 */

/**
 * @type {Vendor}
 */
const vendors = [{
    startTime: 0,
    endTime: 4,
    price: 5
}, {
    startTime: 2,
    endTime: 8,
    price: 3
}, {
    startTime: 8,
    endTime: 11,
    price: 10
}];

/**
 * @param {Vendor[]}
 * @return {Vendor[]}
 */
function cheapestPrice(vendors) {
    return vendors
        .sort((a, b) => {
            return a.startTime - b.startTime;
        })
        .reduce((acc, vendor, index) => {
            for (let i = ++index, minPrice = vendor.price; i < vendors.length; i++) {
                if (vendors[i].startTime <= vendor.endTime && vendor.endTime <= vendors[i].endTime && vendors[i].price < minPrice) {
                    minPrice = vendors[i].price;
                    vendor.endTime = vendors[i].startTime;
                }
            }

            if (vendor.startTime !== vendor.endTime) {
                acc.push(vendor);
            }

            return acc;
        }, []);
}

console.log(cheapestPrice(vendors));